"use client";

export default function DashboardSidebar({ contacts, active, onSelect }) {
  return (
    <aside className="card p-4 h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-xl">Conversations</h2>
      </div>
      <div className="space-y-2">
        {contacts.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className={`w-full text-left p-3 rounded-lg border border-white/10 hover:bg-white/5 ${active?.id===c.id ? "bg-white/10" : ""}`}
          >
            <div className="text-sm font-semibold">{c.name || c.phone}</div>
            <div className="text-xs text-white/60 line-clamp-1">{c.last_message || "—"}</div>
          </button>
        ))}
        {!contacts.length && <div className="text-white/60 text-sm">No conversations yet.</div>}
      </div>
    </aside>
  );
}
