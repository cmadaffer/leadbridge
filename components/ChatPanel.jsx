"use client";

import { useEffect, useState } from "react";

export default function ChatPanel({ contact, onSent }) {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");

  async function load() {
    if (!contact) return;
    const r = await fetch(`/api/messages?contact_id=${contact.id}`);
    const j = await r.json();
    setMsgs(j);
  }

  useEffect(() => {
    load();
    if (!contact) return;
    const iv = setInterval(load, 4000);
    return () => clearInterval(iv);
  }, [contact?.id]);

  async function send() {
    if (!text.trim() || !contact) return;
    const r = await fetch("/api/twilio/send", { method: "POST", body: JSON.stringify({ phone: contact.phone, body: text }) });
    if (r.ok) {
      setText("");
      await load();
      onSent?.();
    }
  }

  if (!contact) {
    return <section className="card p-6 h-[70vh] flex items-center justify-center text-white/60">Select a conversation</section>;
  }

  return (
    <section className="card p-4 h-[70vh] flex flex-col">
      <div className="p-2 border-b border-white/10">
        <h2 className="font-display text-xl">{contact.name || contact.phone}</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 p-3">
        {msgs.map(m => (
          <div key={m.id} className={`max-w-[80%] ${m.direction==='in' ? "" : "ml-auto text-right"}`}>
            <div className={`inline-block px-3 py-2 rounded-2xl ${m.direction==='in' ? "bg-white/10" : "bg-white text-black"}`}>
              <div className="text-sm">{m.body}</div>
              <div className="text-[10px] mt-1 opacity-60">{new Date(m.created_at).toLocaleString()}</div>
            </div>
          </div>
        ))}
        {!msgs.length && <div className="text-white/60 text-sm">No messages yet.</div>}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={e=>setText(e.target.value)}
          onKeyDown={e=>e.key==='Enter'?send():null}
          placeholder="Type a message…"
          className="flex-1 rounded-full bg-white/10 border border-white/10 px-4 py-3 outline-none"
        />
        <button onClick={send} className="rounded-full px-6 py-3 bg-brand-500 hover:bg-brand-400">Send</button>
      </div>
    </section>
  );
}
