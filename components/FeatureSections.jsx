export default function FeatureSections() {
  return (
    <section id="features" className="mt-20">
      <div className="container grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Tap-to-Text everywhere",
            desc: "Add a single link/QR to your Google profile and website. Customers text you instantly."
          },
          {
            title: "AI receptionist",
            desc: "Answers FAQs, qualifies leads, sends booking links, and hands off to staff when needed."
          },
          {
            title: "Leads & transcripts",
            desc: "Every message and contact saved. Alerts for missed leads, quiet hours, and spam filters."
          },
          {
            title: "Compliance built-in",
            desc: "A2P registration helpers, consent language, and STOP/HELP handling included."
          },
          {
            title: "Performance dashboard",
            desc: "Track first-response time, booked jobs, top questions, and ROI."
          },
          {
            title: "Agency-friendly",
            desc: "Manage multiple locations, templates, and shared FAQ libraries."
          }
        ].map((f) => (
          <div key={f.title} className="card p-6">
            <h3 className="font-display text-xl">{f.title}</h3>
            <p className="mt-2 text-white/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
