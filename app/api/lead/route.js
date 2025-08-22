import { supabaseServer } from "@/lib/supabase-server";
import { okJson, bad } from "@/lib/utils";

export async function POST(req) {
  try {
    const body = await req.json();
    const required = ["name", "email"];
    for (const k of required) if (!body[k]) return bad(`Missing ${k}`, 400);

    const sb = supabaseServer();
    const { error } = await sb.from("site_leads").insert({
      name: body.name,
      email: body.email,
      company: body.company || null,
      phone: body.phone || null,
      notes: body.notes || null,
      sms_ok: !!body.sms_ok
    });
    if (error) return bad(error.message, 500);
    return okJson({ ok: true });
  } catch (e) {
    return bad(e.message || "Failed", 500);
  }
}
