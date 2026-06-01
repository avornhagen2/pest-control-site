import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Inspect",
    description:
      "A licensed technician walks your property and documents every active risk zone and entry point before anything is opened.",
  },
  {
    number: "02",
    title: "Treat",
    description:
      "Targeted, low-impact applications go exactly where the problem is. No broadcast spraying. No disruption to your household.",
  },
  {
    number: "03",
    title: "Protect",
    description:
      "A written guarantee covers every treatment. Scheduled check-ins and a free callback policy keep reinfestation off the table.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-14 md:py-24 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">

        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-16">
          <AnimatedItem>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">
              Process
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4">
              How it works
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-zinc-500 text-lg max-w-[44ch]">
              Three steps. No surprises. A written guarantee at each one.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ number, title, description }) => (
            <AnimatedItem key={number}>
              <div className="card-surface p-5 sm:p-8 flex flex-col gap-5 h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <span className="text-emerald-600 font-extrabold text-sm tabular-nums">
                    {number}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>

      </div>
    </section>
  );
}
