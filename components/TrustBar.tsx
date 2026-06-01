import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

/* example data — replace with verified figures before launch */
const stats = [
  { value: "2009", label: "Founded", detail: "17 years in business" },
  { value: "6,100+", label: "Properties treated", detail: "Across 8 licensed states" },
  { value: "8 states", label: "Licensed coverage", detail: "And expanding" },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-zinc-100">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {stats.map((s, i) => (
            <AnimatedItem
              key={s.label}
              className={`flex flex-col items-center gap-1.5${
                i < stats.length - 1 ? " sm:border-r sm:border-zinc-100" : ""
              }`}
            >
              <span className="text-4xl font-extrabold text-zinc-900 tracking-tight tabular-nums">
                {s.value}
              </span>
              <span className="text-sm font-semibold text-zinc-700">{s.label}</span>
              <span className="text-xs text-zinc-400">{s.detail}</span>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
