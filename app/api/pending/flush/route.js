import { supabaseServer } from "@/lib/supabase-server";
import { sendSMS } from "@/lib/twilio-rest";

export async function POST() {
  if (process.env.TF_APPROVED !== "true") {
    return new Response("TF not approved", { status: 403 });
  }
  const sb = supabaseServer();

  const { data: rows, error } = await sb
    .from("messages")
    .select("id, contact_id, body, pending, status, contacts(phone, opt_out)")
    .eq("pending", true)
    .order("created_at", { ascending: true })
    .limit(200)
    .returns();
  if (error) return new Response(error.message, { status: 500 });

  for (const row of rows || []) {
    const phone = row.contacts?.phone;
    const optOut = row.contacts?.opt_out;
    if (!phone || optOut) {
      await sb.from("messages").update({ pending: false, status: optOut ? "blocked_optout" : "error" }).eq("id", row.id);
      continue;
    }
    try {
      await sendSMS({ to: phone, from: process.env.TWILIO_PHONE_E164, body: row.body });
      await sb.from("messages").update({ pending: false, status: "queued" }).eq("id", row.id);
    } catch (e) {
      await sb.from("messages").update({ pending: false, status: "error" }).eq("id", row.id);
    }
  }
  return new Response(JSON.stringify({ flushed: (rows || []).length }), { status: 200, headers: { "Content-Type": "application/json" } });
}
