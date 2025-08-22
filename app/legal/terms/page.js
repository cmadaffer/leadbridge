import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Terms of Service – LeadBridge" };

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="container pt-24 prose prose-invert max-w-3xl">
        <h1>Terms of Service</h1>
        <p>By using LeadBridge, you agree to our acceptable use and SMS compliance rules including consent and opt-out handling.</p>
        <h3>Fair Use</h3>
        <p>Excessive spam, unlawful content, or harassment is prohibited.</p>
        <h3>Liability</h3>
        <p>Service is provided as-is; we strive for high availability and data security.</p>
      </main>
      <Footer />
    </>
  );
}
