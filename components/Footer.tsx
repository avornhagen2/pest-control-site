export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          <div>
            <p className="font-extrabold text-xl text-white tracking-tight mb-2">
              Vantage<span className="text-emerald-400">Pest</span>
            </p>
            <p className="text-zinc-500 text-sm">
              Precision pest control since 2009.
            </p>
          </div>

          <nav>
            <p className="text-zinc-400 text-sm font-semibold mb-3">Services</p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#services" className="hover:text-zinc-300 transition-colors">Residential</a></li>
              <li><a href="#services" className="hover:text-zinc-300 transition-colors">Commercial</a></li>
              <li><a href="#services" className="hover:text-zinc-300 transition-colors">Termite</a></li>
              <li><a href="#services" className="hover:text-zinc-300 transition-colors">Emergency</a></li>
            </ul>
          </nav>

          <div>
            <p className="text-zinc-400 text-sm font-semibold mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <a href="tel:+15558470293" className="hover:text-zinc-300 transition-colors">
                  (555) 847-0293
                </a>
              </li>
              <li>
                <a href="mailto:hello@vantagepest.com" className="hover:text-zinc-300 transition-colors">
                  hello@vantagepest.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-800">
          <p className="text-zinc-600 text-xs">
            &copy; 2026 Vantage Pest Services, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
