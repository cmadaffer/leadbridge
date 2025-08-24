import { supabaseServer } from "@/lib/supabase-server";
import { twilioClient } from "@/lib/twilio";
import { normalizePhone } from "@/lib/phone";

export async function POST(req) {
  try {
    const { phone, body } = await req.json();
    if (!phone || !body) return new Response("Missing phone/body", { status: 400 });
    const to = normalizePhone(phone);

    const sb = supabaseServer();
    // Ensure contact exists
    let { data: c } = await sb.from("contacts").select("*").eq("phone", to).single();
    if (!c) {
      const ins = await sb.from("contacts").insert({ phone: to, last_message: body, last_at: new Date().toISOString() }).select("*").single();
      c = ins.data;
    }

    const msg = await twilioClient().messages.create({
      to,
      from: process.env.TWILIO_PHONE_E164,
      body
    });

    await sb.from("messages").insert({ contact_id: c.id, direction: "out", body, status: msg.status || "queued" });
    await sb.from("contacts").update({ last_message: body, last_at: new Date().toISOString() }).eq("id", c.id);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(e.message || "Failed", { status: 500 });
  }
}
