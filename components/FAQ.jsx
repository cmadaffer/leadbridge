export default function FAQ() {
  const faqs = [
    ["Do I need a new phone number?", "We provision a dedicated texting number for your location. You keep your main voice number."],
    ["What if a customer texts at midnight?", "Your quiet hours auto-reply and the AI schedules follow-up at opening time."],
    ["Is this compliant?", "Yes—consent language and STOP/HELP handling are built in. We also support A2P registration."],
    ["Can staff jump in?", "Anytime. The conversation continues in your dashboard; AI steps back until needed."]
  ];
  return (
    <section className="mt-16">
      <div className="container grid md:grid-cols-2 gap-6">
        {faqs.map(([q,a]) => (
          <div key={q} className="card p-6">
            <h4 className="font-display text-lg">{q}</h4>
            <p className="mt-2 text-white/70">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
