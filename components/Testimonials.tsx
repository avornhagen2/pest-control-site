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
    <section id="testimonials" className="py-24 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-3">
            What customers say
          </h2>
          <p className="text-zinc-500 text-lg">
            Every review is from a verified customer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-zinc-200 rounded-xl p-7 flex flex-col justify-between gap-8"
            >
              <div>
                <span className="block text-4xl font-extrabold text-emerald-100 leading-none mb-4 select-none">
                  &ldquo;
                </span>
                <p className="text-zinc-700 text-sm leading-relaxed">{q.body}</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">{q.name}</p>
                <p className="text-zinc-400 text-xs mt-0.5">{q.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
