import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import FeatureSections from "@/components/FeatureSections";
import Testimonials from "@/components/Testimonials";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <FeatureSections />
        <Testimonials />
        <PricingTable />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
