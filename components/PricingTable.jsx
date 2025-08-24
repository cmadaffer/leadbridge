"use client";
import Link from "next/link";

export default function PricingTable() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      sub: "/mo",
      bullets: ["Tap-to-Text link & QR", "Lead capture & alerts", "500 SMS included"],
      cta: "/contact"
    },
    {
      name: "Pro",
      price: "$149",
      sub: "/mo",
      highlight: true,
      bullets: ["Everything in Starter", "AI receptionist + FAQ brain", "Booking link & handoff rules", "2,000 SMS included"],
      cta: "/contact"
    },
    {
      name: "Agency",
      price: "$399",
      sub: "/mo",
      bullets: ["10 locations included", "Shared FAQ library", "Centralized reporting"],
      cta: "/contact"
    }
  ];

  return (
    <section className="mt-16">
      <div className="container grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.name} className={`card p-6 ${p.highlight ? "ring-2 ring-brand-400" : ""}`}>
            <h3 className="font-display text-2xl">{p.name}</h3>
            <p className="mt-3"><span className="text-4xl font-display">{p.price}</span><span className="text-white/60">{p.sub}</span></p>
            <ul className="mt-4 space-y-2 text-white/80 text-sm">
              {p.bullets.map((b) => <li key={b}>• {b}</li>)}
            </ul>
            <Link href={p.cta} className="mt-6 inline-block rounded-full px-5 py-3 bg-white text-black hover:opacity-90">Get Started</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

