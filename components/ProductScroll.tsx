"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "motion/react";

const panels = [
  {
    id: "p1",
    kicker: "The Equipment",
    headline: "Professional-grade backpack systems.",
    body: "The same rigs used by commercial operations nationwide. Engineered for precision, inspected and calibrated before every job.",
  },
  {
    id: "p2",
    kicker: "The Method",
    headline: "Applied exactly where it matters.",
    body: "Adjustable pressure. Targeted nozzles. Every application reaches the problem directly — not broadcast across your whole property.",
  },
  {
    id: "p3",
    kicker: "The Guarantee",
    headline: "Certified and fully accountable.",
    body: "Every technician carries their state license to every job. Every treatment comes backed by a written guarantee and a free callback.",
  },
];

export default function ProductScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          // Hand off playback control to scroll
          video.pause();

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: 1.2,
              anticipatePin: 1,
            },
          });

          // Video scrubs frame-by-frame across the entire scroll
          tl.to(video, {
            currentTime: video.duration,
            ease: "none",
            duration: 9,
          }, 0);

          // Panel 1 exits ~30% through
          tl.to(panel1Ref.current, { opacity: 0, y: -24, duration: 0.4 }, 2.4);

          // Panel 2 enters ~33%, exits ~63%
          tl.fromTo(
            panel2Ref.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.4 },
            2.8
          );
          tl.to(panel2Ref.current, { opacity: 0, y: -24, duration: 0.4 }, 5.4);

          // Panel 3 enters ~66%, stays to end
          tl.fromTo(
            panel3Ref.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.4 },
            5.8
          );

          return () => {
            video.currentTime = 0;
          };
        });
      }, section);
    };

    if (reduce) return;

    if (video.readyState >= 1) {
      init();
    } else {
      video.addEventListener("loadedmetadata", init, { once: true });
    }

    return () => {
      ctx?.revert();
    };
  }, [reduce]);

  const panelRefs = [panel1Ref, panel2Ref, panel3Ref];

  return (
    <>
      {/* ── Desktop: scroll-pinned product reveal ── */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative bg-white border-t border-zinc-100 overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div className="h-full grid grid-cols-2 items-center max-w-7xl mx-auto px-12 gap-8">

          {/* Left: cycling text panels */}
          <div className="relative h-full">
            {panels.map(({ id, kicker, headline, body }, i) => (
              <div
                key={id}
                ref={panelRefs[i]}
                className={`absolute inset-0 flex items-center${i > 0 ? " opacity-0" : ""}`}
              >
                <div className="max-w-[420px]">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-4">
                    {kicker}
                  </p>
                  <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.05] mb-5">
                    {headline}
                  </h2>
                  <p className="text-zinc-500 text-lg leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: video frame-scrubbed by scroll */}
          <div className="flex items-center justify-center h-full">
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full max-h-[80vh] object-contain"
            >
              <source src="/videos/rotating-pest-control-backpack.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </section>

      {/* ── Mobile: static stacked layout ── */}
      <section className="lg:hidden bg-white border-t border-zinc-100 py-16 px-6">
        <video
          muted
          playsInline
          autoPlay
          loop
          className="w-full max-h-56 object-contain mb-12"
        >
          <source src="/videos/rotating-pest-control-backpack.mp4" type="video/mp4" />
        </video>
        <div className="max-w-lg mx-auto space-y-10">
          {panels.map(({ id, kicker, headline, body }) => (
            <div key={id}>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
                {kicker}
              </p>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">{headline}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
