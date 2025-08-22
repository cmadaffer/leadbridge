import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-20 md:pt-28">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-6xl leading-tight">
              Turn Google clicks into <span className="text-brand-300">booked conversations</span>
            </h1>
            <p className="mt-5 text-white/80 text-lg">
              Google removed Business Profile chat. LeadBridge replaces it with instant
              texting and an AI receptionist that answers, qualifies, and books 24/7.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/demo" className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-400">
                Try the Live Demo
              </Link>
              <Link href="/pricing" className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5">
                See Pricing
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/60">
              SMS consent & STOP/HELP built-in. Quiet hours & human handoff included.
            </p>
          </div>
          <div className="relative">
            <div className="card p-3 md:p-6">
              <Image
                src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop"
                alt="Messaging dashboard"
                width={1200}
                height={800}
                className="rounded-xl"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block card p-4">
              <p className="text-sm">“First reply in 7 seconds. Booked 19% more jobs.”</p>
              <p className="text-xs text-white/60 mt-1">– WildOak Plumbing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
