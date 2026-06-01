"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-16 flex items-center bg-zinc-50/90 backdrop-blur-md border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-0.5 font-extrabold text-xl text-zinc-900 tracking-tight">
          Vantage<span className="text-emerald-600">Pest</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <a href="#services" className="hover:text-zinc-900 transition-colors duration-150">Services</a>
          <a href="#process" className="hover:text-zinc-900 transition-colors duration-150">How It Works</a>
          <a href="#testimonials" className="hover:text-zinc-900 transition-colors duration-150">Reviews</a>
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors duration-200 active:scale-[0.98]"
        >
          Get a Free Inspection
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-zinc-700"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      {open && (
        <div className="absolute top-16 inset-x-0 bg-zinc-50 border-b border-zinc-200 md:hidden px-6 py-5 flex flex-col gap-4">
          <a href="#services" onClick={() => setOpen(false)} className="text-zinc-700 font-medium py-1">Services</a>
          <a href="#process" onClick={() => setOpen(false)} className="text-zinc-700 font-medium py-1">How It Works</a>
          <a href="#testimonials" onClick={() => setOpen(false)} className="text-zinc-700 font-medium py-1">Reviews</a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center px-5 py-3 bg-emerald-600 text-white font-semibold rounded-lg mt-1"
          >
            Get a Free Inspection
          </a>
        </div>
      )}
    </header>
  );
}
