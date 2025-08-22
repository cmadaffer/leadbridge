import { okJson, bad } from "@/lib/utils";

export async function POST(req) {
  try {
    const { history = [] } = await req.json();
    const last = history[history.length - 1]?.content || "";

    // If OPENAI_API_KEY present, use it; otherwise fallback template.
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      const prompt = `You are an AI receptionist for a local service business. Be concise, friendly, and action-oriented. 
If the user asks for booking, provide: "Here’s the booking link: https://calendly.com/you/demo".
If asked for price, give a reasonable range and suggest booking.
User: ${last}`;
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: "Professional AI receptionist." }, { role: "user", content: prompt }],
          temperature: 0.3
        })
      });
      const j = await r.json();
      const reply = j?.choices?.[0]?.message?.content?.trim() || "Happy to help—what can I answer?";
      return okJson({ reply });
    } else {
      const canned = last.toLowerCase().includes("price") ? 
        "Most jobs range $150–$300. Want me to send the booking link?" :
        last.toLowerCase().includes("hours") ?
        "We’re open Mon–Sat 8am–6pm. Would you like to book a time?" :
        "Great question—want me to send over the booking link?";
      return okJson({ reply: canned });
    }
  } catch (e) {
    return bad(e.message || "Failed", 500);
  }
}
