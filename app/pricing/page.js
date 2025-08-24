"use client";

import Navbar from "@/components/Navbar";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-24 container">
          <h1 className="font-display text-4xl">Simple pricing</h1>
          <p className="mt-2 text-white/70">Start free. Upgrade anytime.</p>
        </section>
        <PricingTable />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

