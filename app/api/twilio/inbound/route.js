import { supabaseServer } from "@/lib/supabase-server";
import { normalizePhone } from "@/lib/phone";
import { sendSMS } from "@/lib/twilio-rest";

export async function POST(req) {
  // Twilio posts x-www-form-urlencoded
  const text = await req.text();
  const params = Object.fromEntries(new URLSearchParams(text).entries());
  const fromPhone = normalizePhone(params.From);
  const toPhone = normalizePhone(params.To);
  const body = (params.Body || "").toString().trim();

  if (!fromPhone || !body) return new Response("OK", { status: 200 });

  const sb = supabaseServer();

  // Upsert contact
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

  // Save inbound message
  await sb.from("messages").insert({ contact_id: c.id, direction: "in", body });

  // Optional auto-reply
  if (process.env.AUTO_REPLY === "true") {
    const reply = await generateReply(body);
    if (reply) {
      try {
        await sendSMS({ to: fromPhone, from: process.env.TWILIO_PHONE_E164, body: reply });
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
        { role: "system", content: "You are an AI receptionist for a local business. Be concise, friendly, and action-oriented. Offer to book with a link if appropriate." },
        { role: "user", content: userMsg }
      ],
      temperature: 0.3
    })
  });
  const j = await r.json();
  return j?.choices?.[0]?.message?.content?.trim()?.slice(0, 500) || null;
}
