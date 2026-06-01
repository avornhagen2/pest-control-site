"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "motion/react";

// Frames extracted per second of video — more = smoother, slower to load
const EXTRACT_FPS = 12;

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
  const sectionRef      = useRef<HTMLDivElement>(null);
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const videoRef        = useRef<HTMLVideoElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const video         = videoRef.current;
    const canvas        = canvasRef.current;
    const section       = sectionRef.current;
    const mobileCanvas  = mobileCanvasRef.current;
    const mobileSection = mobileSectionRef.current;
    if (!video || !canvas || !section || !mobileCanvas || !mobileSection) return;

    let mounted = true;
    let gsapCtx: { revert: () => void } | null = null;
    const frames: ImageBitmap[] = [];

    const seekTo = (t: number) =>
      new Promise<void>(resolve => {
        const onSeeked = () => resolve();
        video.addEventListener("seeked", onSeeked, { once: true });
        video.currentTime = t;
      });

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const totalFrames = Math.ceil(video.duration * EXTRACT_FPS);

      gsapCtx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // ── Desktop: pinned scroll with text crossfades ──
        mm.add("(min-width: 1024px)", () => {
          canvas.width  = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const tl = gsap.timeline();
          tl.to(panel1Ref.current, { opacity: 0, y: -24, duration: 0.5 }, 2.5);
          tl.fromTo(panel2Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 2.5);
          tl.to(panel2Ref.current, { opacity: 0, y: -24, duration: 0.5 }, 5.5);
          tl.fromTo(panel3Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 5.5);
          tl.to({}, { duration: 3.0 }, 6.0);

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            anticipatePin: 1,
            scrub: true,
            animation: tl,
            onUpdate(self) {
              const idx = Math.round(self.progress * totalFrames);
              const frame = frames[idx];
              if (frame) ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
            },
          });

          return () => {};
        });

        // ── Mobile: sticky canvas scrubbed by scroll, no pin ──
        mm.add("(max-width: 1023px)", () => {
          mobileCanvas.width  = video.videoWidth;
          mobileCanvas.height = video.videoHeight;
          const mobileCtx = mobileCanvas.getContext("2d")!;
          mobileCtx.drawImage(video, 0, 0, mobileCanvas.width, mobileCanvas.height);

          ScrollTrigger.create({
            trigger: mobileSection,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate(self) {
              const idx = Math.round(self.progress * totalFrames);
              const frame = frames[idx];
              if (frame) mobileCtx.drawImage(frame, 0, 0, mobileCanvas.width, mobileCanvas.height);
            },
          });

          return () => {};
        });
      });

      // ── Extract frames in the background — animation is already live above ──
      for (let i = 0; i <= totalFrames; i++) {
        if (!mounted) return;
        await seekTo((i / totalFrames) * video.duration);
        if (!mounted) return;
        frames[i] = await createImageBitmap(video);
        await new Promise<void>(r => requestAnimationFrame(() => r()));
      }
    };

    const onMetadata = () => { if (mounted) init(); };

    if (video.readyState >= 1) {
      init();
    } else {
      video.addEventListener("loadedmetadata", onMetadata, { once: true });
    }

    return () => {
      mounted = false;
      video.removeEventListener("loadedmetadata", onMetadata);
      gsapCtx?.revert();
      frames.forEach(f => f.close());
    };
  }, [reduce]);

  const panelRefs = [panel1Ref, panel2Ref, panel3Ref];

  return (
    <>
      {/*
        Hidden video lives outside both display sections so it loads on every
        viewport size — display:none on the parent would block metadata on mobile.
      */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      >
        <source src="/videos/rotating-pest-control-backpack.mp4" type="video/mp4" />
      </video>

      {/* ── Desktop: scroll-pinned product reveal ── */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative bg-white border-t border-zinc-100"
        style={{ height: "100vh" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent pointer-events-none" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-12">
          <div className="relative h-full w-1/2">
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
        </div>
      </section>

      {/* ── Mobile: sticky scroll-scrubbed canvas + panels ── */}
      <section
        ref={mobileSectionRef}
        className="lg:hidden bg-white border-t border-zinc-100"
      >
        {/* Canvas is sticky — frames are drawn by the ScrollTrigger above */}
        <div className="sticky top-0 z-10 h-[45dvh] bg-zinc-800 overflow-hidden flex items-center justify-center">
          <canvas
            ref={mobileCanvasRef}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </div>

        <div className="max-w-lg mx-auto px-6 pt-4 pb-16 space-y-14">
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
