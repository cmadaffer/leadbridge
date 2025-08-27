import { supabaseServer } from "@/lib/supabase-server";
import { normalizePhone } from "@/lib/phone";
import { sendSMS } from "@/lib/twilio-rest";

export async function POST(req) {
  try {
    const { phone, body } = await req.json();
    if (!phone || !body) return new Response("Missing phone/body", { status: 400 });

    const to = normalizePhone(phone);
    const from = process.env.TWILIO_PHONE_E164;

    const sb = supabaseServer();

    // Ensure contact exists
    let { data: c } = await sb.from("contacts").select("*").eq("phone", to).single();
    if (!c) {
      const ins = await sb.from("contacts")
        .insert({ phone: to, last_message: body, last_at: new Date().toISOString() })
        .select("*").single();
      c = ins.data;
    }

    if (c.opt_out) return new Response("Contact is opted out", { status: 403 });

    // If TF not approved, queue and exit
    if (process.env.TF_APPROVED !== "true") {
      await sb.from("messages").insert({
        contact_id: c.id, direction: "out", body, status: "pending_due_verification", pending: true
      });
      return new Response(JSON.stringify({ queued: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const tw = await sendSMS({ to, from, body });
    await sb.from("messages").insert({
      contact_id: c.id, direction: "out", body, status: tw.status || "queued", pending: false
    });
    await sb.from("contacts").update({ last_message: body, last_at: new Date().toISOString() }).eq("id", c.id);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(e.message || "Failed", { status: 500 });
  }
}
