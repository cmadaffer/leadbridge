export async function sendSMS({ to, from, body }) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) throw new Error("Missing Twilio SID/token env vars");
  if (!from) throw new Error("Missing TWILIO_PHONE_E164 env var");

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const payload = new URLSearchParams({ To: to, From: from, Body: body }).toString();

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: payload
  });

  const json = await res.json();
  if (!res.ok) {
    const msg = json?.message || json?.detail || `Twilio send failed (${res.status})`;
    throw new Error(msg);
  }
  return json; // includes sid, status, etc.
}
