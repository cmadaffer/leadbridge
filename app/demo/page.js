"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Live Demo – LeadBridge" };

export default function DemoPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You’re texting WildOak Plumbing. Ask anything!" }
  ]);
  const [input, setInput] = useState("");

  async function send() {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    const res = await fetch("/api/ai/respond", {
      method: "POST",
      body: JSON.stringify({ history: [...messages, userMsg] })
    });
    const data = await res.json();
    setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
  }

  return (
    <>
      <Navbar />
      <main className="container pt-24">
        <h1 className="font-display text-4xl">Try the AI receptionist</h1>
        <p className="mt-2 text-white/70">This simulates a customer texting your business.</p>
        <div className="mt-6 card p-4 md:p-6">
          <div className="h-80 overflow-y-auto space-y-3">
            {messages.slice(1).map((m, i) => (
              <div key={i} className={`max-w-[80%] ${m.role === "user" ? "ml-auto text-right" : ""}`}>
                <div className={`inline-block px-3 py-2 rounded-2xl ${m.role === "user" ? "bg-white text-black" : "bg-white/10"}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              className="flex-1 rounded-full bg-white/10 border border-white/10 px-4 py-3 outline-none"
              placeholder="Ask about hours, pricing, or booking…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" ? send() : null}
            />
            <button onClick={send} className="rounded-full px-6 py-3 bg-brand-500 hover:bg-brand-400">Send</button>
          </div>
          <p className="text-xs text-white/50 mt-2">Powered by OpenAI if configured; otherwise a smart fallback reply.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
