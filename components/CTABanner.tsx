export default function CTABanner() {
  return (
    <section id="contact" className="bg-zinc-950 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Stop sharing your home.
        </h2>
        <p className="text-zinc-400 text-lg mb-10 max-w-[42ch] mx-auto leading-relaxed">
          Free inspections. No sales pressure. A written plan before any
          product goes down.
        </p>
        <a
          href="tel:+15558470293"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-lg transition-colors duration-200 active:scale-[0.98] active:-translate-y-px"
        >
          Get a Free Inspection
        </a>
        <p className="mt-5 text-zinc-500 text-sm">
          Or call (555) 847-0293. Available 7 days a week.
        </p>
      </div>
    </section>
  );
}
