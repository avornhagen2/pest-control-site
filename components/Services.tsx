import {
  House,
  Bug,
  Buildings,
  Siren,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const services = [
  {
    Icon: House,
    title: "Residential Protection",
    description:
      "Monthly, quarterly, or one-time programs designed around how your household actually operates. No upsells.",
  },
  {
    Icon: Bug,
    title: "Termite Detection",
    description:
      "Annual inspections with written wood-damage reports and moisture readings. Catch problems before they cost you.",
  },
  {
    Icon: Buildings,
    title: "Commercial Contracts",
    description:
      "Discreet, off-hours service for restaurants, offices, and retail. Compliant documentation included.",
  },
  {
    Icon: Siren,
    title: "Emergency Response",
    description:
      "Bed bugs, wasp nests, wildlife intrusions. Same-day arrival. No added emergency surcharge.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-14 md:py-24 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">

        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-16">
          <AnimatedItem>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">
              Services
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4">
              What we treat
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-zinc-500 text-lg max-w-[44ch]">
              Every service includes a follow-up visit and a written guarantee.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map(({ Icon, title, description }) => (
            <AnimatedItem key={title}>
              <div className="card-surface p-5 sm:p-8 flex flex-col gap-5 hover:translate-y-[-2px] transition-transform duration-200 h-full">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Icon size={22} className="text-emerald-600" weight="duotone" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-2">{title}</h3>
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
