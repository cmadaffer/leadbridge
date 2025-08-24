"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 shadow-glow" />
          <span className="font-display text-xl tracking-tight">LeadBridge</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/#features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/demo">Live Demo</Link>
          <Link href="/contact" className="rounded-full px-4 py-2 bg-white text-black hover:opacity-90">Get Started</Link>
        </div>
        <div className="md:hidden">
          <Link href="/contact" className="rounded-full px-4 py-2 bg-white text-black">Start</Link>
        </div>
      </nav>
    </header>
  );
}
