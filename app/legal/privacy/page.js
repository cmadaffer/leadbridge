import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy – LeadBridge" };

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="container pt-24 prose prose-invert max-w-3xl">
        <h1>Privacy Policy</h1>
        <p>We collect contact details and conversation metadata to provide the service. We never sell your data.</p>
        <h3>Data we process</h3>
        <ul>
          <li>Lead info (name, phone, email)</li>
          <li>Messages and transcripts</li>
          <li>Operational logs (for reliability)</li>
        </ul>
        <h3>Opt-out & SMS</h3>
        <p>Customers can reply STOP to opt-out; HELP for assistance. We honor carrier compliance policies.</p>
      </main>
      <Footer />
    </>
  );
}
