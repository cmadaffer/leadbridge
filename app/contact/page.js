"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Get Started – LeadBridge" };

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const t = await res.text();
      setError(t || "Something went wrong.");
      return;
    }
    setDone(true);
  }

  return (
    <>
      <Navbar />
      <main className="container pt-24">
        <h1 className="font-display text-4xl">Start your free trial</h1>
        <p className="mt-2 text-white/70">No credit card required.</p>

        <form onSubmit={submit} className="mt-6 card p-6 grid md:grid-cols-2 gap-4">
          <input name="name" required placeholder="Full name" className="rounded-lg bg-white/10 px-4 py-3 border border-white/10" />
          <input name="email" required type="email" placeholder="Email" className="rounded-lg bg-white/10 px-4 py-3 border border-white/10" />
          <input name="company" placeholder="Company" className="rounded-lg bg-white/10 px-4 py-3 border border-white/10 md:col-span-1" />
          <input name="phone" placeholder="Phone (for demo text)" className="rounded-lg bg-white/10 px-4 py-3 border border-white/10 md:col-span-1" />
          <textarea name="notes" placeholder="What do you want to improve?" className="rounded-lg bg-white/10 px-4 py-3 border border-white/10 md:col-span-2" />
          <label className="text-xs text-white/60 md:col-span-2">
            <input type="checkbox" name="sms_ok" className="mr-2" defaultChecked /> I agree to receive demo texts; reply STOP to opt out.
          </label>
          <button disabled={loading} className="mt-2 md:col-span-2 rounded-full px-6 py-3 bg-white text-black hover:opacity-90">
            {loading ? "Submitting…" : "Request Demo"}
          </button>
          {done && <p className="text-brand-300 md:col-span-2">Thanks! We’ll be in touch shortly.</p>}
          {error && <p className="text-red-300 md:col-span-2">{error}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}
