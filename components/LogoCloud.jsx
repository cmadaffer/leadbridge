export default function LogoCloud() {
  const logos = ["Home", "Dental", "Auto", "MedSpa", "Legal", "Realty"];
  return (
    <section className="mt-16">
      <div className="container">
        <div className="card py-6 px-6">
          <p className="text-center text-white/60 text-sm">Built for modern local businesses</p>
          <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-4 opacity-80">
            {logos.map((l) => (
              <div key={l} className="h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
