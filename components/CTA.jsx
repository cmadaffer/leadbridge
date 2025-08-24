"use client";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="mt-20 mb-12">
      <div className="container">
        <div className="card p-8 md:p-12 text-center">
          <h3 className="font-display text-3xl">Replace your lost Google chat in 10 minutes</h3>
          <p className="mt-2 text-white/70">Add Tap-to-Text today and let the AI receptionist book jobs 24/7.</p>
          <div className="mt-6">
            <Link href="/contact" className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-400">Start Free Trial</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

