import { supabaseServer } from "@/lib/supabase-server";
import { normalizePhone } from "@/lib/phone";
import { sendSMS } from "@/lib/twilio-rest";
import { notifySlack } from "@/lib/notify";

export async function POST(req) {
  const text = await req.text();
  const params = Object.fromEntries(new URLSearchParams(text).entries());
  const fromPhone = normalizePhone(params.From);
  const body = (params.Body || "").toString().trim();

  if (!fromPhone || !body) return new Response("OK", { status: 200 });

  const sb = supabaseServer();

  // Upsert / update contact
  let { data: c } = await sb.from("contacts").select("*").eq("phone", fromPhone).single();
  if (!c) {
    const ins = await sb.from("contacts")
      .insert({ phone: fromPhone, last_message: body, last_at: new Date().toISOString() })
      .select("*").single();
    c = ins.data;
  } else {
    await sb.from("contacts")
      .update({ last_message: body, last_at: new Date().toISOString() })
      .eq("id", c.id);
  }

  // Save inbound
  await sb.from("messages").insert({ contact_id: c.id, direction: "in", body });

  // Slack notify (optional)
  await notifySlack(`📩 New inbound text from ${c.phone}: ${body.slice(0, 300)}`);

  // Compliance: STOP/HELP handling
  const low = body.trim().toLowerCase();
  const isStop = ["stop","unsubscribe","cancel","end","quit"].includes(low);
  const isHelp = low === "help";

  if (isStop) {
    await sb.from("contacts").update({ opt_out: true }).eq("id", c.id);
    // Best practice is to send a confirmation, but TF may be blocked.
    if (process.env.TF_APPROVED === "true") {
      try {
        await sendSMS({ to: c.phone, from: process.env.TWILIO_PHONE_E164, body: "You’re opted out and won’t receive more texts. Reply START to opt back in." });
        await sb.from("messages").insert({ contact_id: c.id, direction: "out", body: "Opt-out confirmation", status: "queued" });
      } catch {}
    } else {
      // queue the confirmation for later (optional)
      await sb.from("messages").insert({
        contact_id: c.id, direction: "out", body: "You’re opted out and won’t receive more texts. Reply START to opt back in.",
        status: "pending_due_verification", pending: true
      });
    }
    return new Response("OK", { status: 200 });
  }

  if (isHelp && process.env.TF_APPROVED === "true") {
    try {
      await sendSMS({
        to: c.phone, from: process.env.TWILIO_PHONE_E164,
        body: "Help: This is LeadBridge messaging. Reply STOP to opt out. Support: support@yourdomain.com"
      });
      await sb.from("messages").insert({ contact_id: c.id, direction: "out", body: "HELP response", status: "queued" });
    } catch {}
  } else if (isHelp) {
    await sb.from("messages").insert({
      contact_id: c.id, direction: "out",
      body: "Help: This is LeadBridge messaging. Reply STOP to opt out. Support: support@yourdomain.com",
      status: "pending_due_verification", pending: true
    });
  }

  // Optional AI auto-reply ONLY if TF approved and not opted out
  if (process.env.AUTO_REPLY === "true" && process.env.TF_APPROVED === "true" && !c.opt_out) {
    const reply = await generateReply(body);
    if (reply) {
      try {
        await sendSMS({ to: c.phone, from: process.env.TWILIO_PHONE_E164, body: reply });
        await sb.from("messages").insert({ contact_id: c.id, direction: "out", body: reply, status: "queued" });
        await sb.from("contacts").update({ last_message: reply, last_at: new Date().toISOString() }).eq("id", c.id);
      } catch (e) {
        await sb.from("messages").insert({ contact_id: c.id, direction: "out", body: reply, status: "error", error: e.message?.slice(0, 500) });
      }
    }
  }

  return new Response("OK", { status: 200 });
}

async function generateReply(userMsg) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    const low = userMsg.toLowerCase();
    if (low.includes("price")) return "Most jobs range $150–$300. Want me to send a booking link?";
    if (low.includes("hours")) return "We’re open Mon–Sat 8am–6pm. Would you like to book a time?";
    return "Happy to help! Want me to send our booking link?";
  }
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI receptionist for a local business. Be concise and action-oriented." },
        { role: "user", content: userMsg }
      ],
      temperature: 0.3
    })
  });
  const j = await r.json();
  return j?.choices?.[0]?.message?.content?.trim()?.slice(0, 500) || null;
}
