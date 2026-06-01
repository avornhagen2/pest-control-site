"use client";

import { motion, useReducedMotion } from "motion/react";

export default function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative min-h-[100dvh] bg-zinc-50 overflow-hidden flex items-center justify-center">

      {/* Video layer with radial inward mask — fades edges into bg-zinc-50 */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 35%, transparent 88%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 35%, transparent 88%)",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/ant-army-vs-barrier.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark scrim so text stays legible over the video */}
        <div className="absolute inset-0 bg-zinc-950/50" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 max-w-3xl mx-auto w-full">
        <motion.h1
          {...enter(0.1)}
          className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white"
        >
          Precision pest control
          <br />
          for <span className="text-emerald-400">homes</span> that matter.
        </motion.h1>

        <motion.p
          {...enter(0.22)}
          className="mt-6 text-lg text-zinc-200 leading-relaxed max-w-[44ch]"
        >
          Licensed technicians. Discreet service. Guaranteed results in 48
          hours or we return at no charge.
        </motion.p>

        <motion.div
          {...enter(0.34)}
          className="mt-8 flex flex-wrap justify-center items-center gap-3"
        >
          <a
            href="#contact"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors duration-200 active:scale-[0.98] active:-translate-y-px"
          >
            Get a Free Inspection
          </a>
          <a
            href="#services"
            className="px-6 py-3 border border-white/30 hover:border-white/50 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors duration-200 backdrop-blur-sm"
          >
            View Services
          </a>
        </motion.div>
      </div>

    </section>
  );
}
