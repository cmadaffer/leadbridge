"use client";

export default function Testimonials() {
  const items = [
    { quote: "Booked 19% more jobs in month one.", who: "WildOak Plumbing" },
    { quote: "Customers love texting — faster than phone tag.", who: "Nexa Dental Group" },
    { quote: "Setup took 10 minutes. It just works.", who: "SouthBay Auto" }
  ];
  return (
    <section className="mt-20">
      <div className="container grid md:grid-cols-3 gap-6">
        {items.map((t) => (
          <div key={t.quote} className="card p-6">
            <p className="text-lg">“{t.quote}”</p>
            <p className="text-white/60 text-sm mt-3">— {t.who}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

