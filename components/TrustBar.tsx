/* example data - replace with verified figures before launch */
const stats = [
  { value: "2009", label: "Founded" },
  { value: "6,100+", label: "Properties treated" },
  { value: "8 states", label: "Licensed coverage" },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 divide-x divide-zinc-200">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 px-4">
            <span className="text-2xl font-extrabold text-zinc-900 tabular-nums">
              {s.value}
            </span>
            <span className="text-xs text-zinc-500">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
