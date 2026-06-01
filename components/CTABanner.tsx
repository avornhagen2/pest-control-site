import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

export default function CTABanner() {
  return (
    <section id="contact" className="relative bg-zinc-950 py-16 md:py-28 overflow-hidden">
      {/* Subtle emerald glow at top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-800/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 40% at 50% 0%, #059669, transparent)",
        }}
        aria-hidden
      />

      <AnimatedSection className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <AnimatedItem>
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-5">
            Get started
          </p>
        </AnimatedItem>
        <AnimatedItem>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
            Stop sharing your home.
          </h2>
        </AnimatedItem>
        <AnimatedItem>
          <p className="text-zinc-400 text-lg mb-10 max-w-[40ch] mx-auto leading-relaxed">
            Free inspections. No sales pressure. A written plan before any
            product goes down.
          </p>
        </AnimatedItem>
        <AnimatedItem>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors duration-200 active:scale-[0.98]"
            >
              Get a Free Inspection
            </a>
            <a
              href="tel:+15558470293"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Call (555) 847-0293
            </a>
          </div>
          <p className="mt-6 text-zinc-600 text-sm">Available 7 days a week.</p>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
