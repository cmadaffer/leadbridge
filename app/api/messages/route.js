import { supabaseServer } from "@/lib/supabase-server";

export async function GET(req) {
  const contactId = new URL(req.url).searchParams.get("contact_id");
  if (!contactId) return new Response("Missing contact_id", { status: 400 });

  const sb = supabaseServer();
  const { data, error } = await sb
    .from("messages")
    .select("id, created_at, direction, body, status")
    .eq("contact_id", contactId)
    .order("created_at", { ascending: true })
    .limit(500);
  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data || []), { status: 200, headers: { "Content-Type": "application/json" } });
}
