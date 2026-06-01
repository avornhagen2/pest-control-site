export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 pt-10 sm:pt-16 pb-8 sm:pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-14">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <a
              href="/"
              className="font-extrabold text-xl text-white tracking-tight mb-3 block"
            >
              Vantage<span className="text-emerald-400">Pest</span>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[28ch] mb-5">
              Licensed pest control for homeowners and businesses. Serving 8
              states since 2009.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5">
                State Licensed
              </span>
              <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5">
                Fully Insured
              </span>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <p className="text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Services
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <a href="#services" className="hover:text-zinc-300 transition-colors">
                  Residential
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-zinc-300 transition-colors">
                  Commercial
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-zinc-300 transition-colors">
                  Termite
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-zinc-300 transition-colors">
                  Emergency
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-4">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="tel:+15558470293"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  (555) 847-0293
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@vantagepest.com"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  hello@vantagepest.com
                </a>
              </li>
              <li className="text-zinc-600 text-xs pt-1">Mon–Sun, 7 am–7 pm</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-zinc-600 text-xs">
            &copy; 2026 Vantage Pest Services, LLC. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs">
            Licensed in TX, CO, TN, and 5 other states.
          </p>
        </div>

      </div>
    </footer>
  );
}
