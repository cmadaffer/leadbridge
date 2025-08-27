"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/DashboardSidebar";
import ChatPanel from "@/components/ChatPanel";

const TF_APPROVED = process.env.NEXT_PUBLIC_TF_APPROVED === "true"; // optional mirror var

export default function DashboardPage() {
  const [contacts, setContacts] = useState([]);
  const [active, setActive] = useState(null);
  const [tfApproved, setTfApproved] = useState(false);

  async function loadContacts() {
    const r = await fetch("/api/contacts");
    const j = await r.json();
    setContacts(j);
    if (!active && j.length) setActive(j[0]);
  }

  useEffect(() => {
    setTfApproved(Boolean(process.env.NEXT_PUBLIC_TF_APPROVED === "true"));
    loadContacts();
    const iv = setInterval(loadContacts, 6000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <Navbar />
      <main className="container pt-24">
        {(!tfApproved && process.env.NODE_ENV !== "production") || !tfApproved ? (
          <div className="mb-4 card p-4 border border-yellow-500/40">
            <div className="text-yellow-300 font-semibold">Toll-Free pending</div>
            <div className="text-white/70 text-sm">
              Outbound SMS is queued until approval. You can still reply using your phone via the “Text from phone” button.
            </div>
          </div>
        ) : null}
        <div className="grid md:grid-cols-[320px_1fr] gap-6">
          <DashboardSidebar contacts={contacts} active={active} onSelect={setActive} />
          <ChatPanel contact={active} onSent={loadContacts} tfApproved={tfApproved} />
        </div>
      </main>
      <Footer />
    </>
  );
}
