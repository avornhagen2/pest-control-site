import { Star } from "@phosphor-icons/react/dist/ssr";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const quotes = [
  {
    id: "mia",
    body: "Fast response. Technician arrived within 4 hours. No disruption to my family, and the follow-up visit was included at no extra cost.",
    name: "Mia Okafor",
    role: "Homeowner, Austin TX",
  },
  {
    id: "derek",
    body: "We used three other services before this. Vantage is the only one that gave us a written guarantee and actually honored it.",
    name: "Derek Thornton",
    role: "Property Manager, Denver CO",
  },
  {
    id: "phoebe",
    body: "Scheduled. Showed up on time. Solved the problem. Sent a detailed report. That is all I needed.",
    name: "Phoebe Hartwell",
    role: "Rental Investor, Nashville TN",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-14 md:py-24 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">

        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-16">
          <AnimatedItem>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">
              Reviews
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4">
              What customers say
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-zinc-500 text-lg">
              Every review is from a verified customer.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <AnimatedItem key={q.id}>
              <div className="card-surface p-5 sm:p-8 flex flex-col gap-6 h-full">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} weight="fill" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed flex-1">{q.body}</p>
                <div className="pt-5 border-t border-zinc-100">
                  <p className="font-semibold text-zinc-900 text-sm">{q.name}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{q.role}</p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>

      </div>
    </section>
  );
}
