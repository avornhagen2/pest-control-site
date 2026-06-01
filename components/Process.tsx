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
    <section id="process" className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-3">
            How it works
          </h2>
          <p className="text-zinc-500 text-lg max-w-[44ch]">
            Three steps. No surprises. A written guarantee at each one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          {steps.map(({ number, title, description }) => (
            <div key={number} className="py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
              <span className="block text-6xl font-extrabold text-zinc-100 leading-none mb-6 select-none">
                {number}
              </span>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
