import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container py-8 text-sm text-white/70 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
        <p>© {new Date().getFullYear()} LeadBridge, Inc.</p>
        <nav className="flex gap-6">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
