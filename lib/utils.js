export function okJson(data, init = 200) {
  return new Response(JSON.stringify(data), { status: init, headers: { "Content-Type": "application/json" } });
}
export function bad(msg = "Bad Request", code = 400) {
  return new Response(msg, { status: code });
}
