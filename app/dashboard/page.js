"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardSidebar from "@/components/DashboardSidebar";
import ChatPanel from "@/components/ChatPanel";

export default function DashboardPage() {
  const [contacts, setContacts] = useState([]);
  const [active, setActive] = useState(null);

  async function loadContacts() {
    const r = await fetch("/api/contacts");
    const j = await r.json();
    setContacts(j);
    if (!active && j.length) setActive(j[0]);
  }

  useEffect(() => {
    loadContacts();
    const iv = setInterval(loadContacts, 6000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <Navbar />
      <main className="container pt-24">
        <div className="grid md:grid-cols-[320px_1fr] gap-6">
          <DashboardSidebar contacts={contacts} active={active} onSelect={setActive} />
          <ChatPanel contact={active} onSent={loadContacts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
