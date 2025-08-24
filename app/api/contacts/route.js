import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("contacts")
    .select("id, phone, name, last_message, last_at")
    .order("last_at", { ascending: false })
    .limit(200);
  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data || []), { status: 200, headers: { "Content-Type": "application/json" } });
}
