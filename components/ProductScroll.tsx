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
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const mobilePanelRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const reduce = useReducedMotion();

  // Mobile video autoplay trigger
  useEffect(() => {
    mobileVideoRef.current?.play().catch(() => {});
  }, []);

  // Mobile panel fade-in on scroll
  useEffect(() => {
    if (reduce) return;
    const els = mobilePanelRefs.current.filter((r): r is HTMLDivElement => r !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    const video   = videoRef.current;
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!video || !canvas || !section) return;

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
      const { gsap }         = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      // ── Size canvas to video's native resolution ──
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d")!;

      // Draw frame 0 immediately so the canvas is never blank
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // totalFrames is known from metadata — used in onUpdate before extraction finishes
      const totalFrames = Math.ceil(video.duration * EXTRACT_FPS);

      // ── Set up ScrollTrigger immediately — no waiting for frame extraction ──
      gsapCtx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          // Each panel gets an equal third of the scroll distance.
          // Crossfades land at exactly 1/3 (3.0) and 2/3 (6.0) of the 9-unit timeline.
          const tl = gsap.timeline();
          tl.to(panel1Ref.current, { opacity: 0, y: -24, duration: 0.5 }, 2.5);
          tl.fromTo(panel2Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 2.5);
          tl.to(panel2Ref.current, { opacity: 0, y: -24, duration: 0.5 }, 5.5);
          tl.fromTo(panel3Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 5.5);
          tl.to({}, { duration: 3.0 }, 6.0); // panel 3 holds through the final third

          // Single ScrollTrigger owns both pin and scrub — avoids pin-spacer
          // layout shift breaking a second trigger's start/end calculation.
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            anticipatePin: 1,
            scrub: true,
            animation: tl,
            onUpdate(self) {
              // Use totalFrames (not frames.length) so the index is correct even
              // while extraction is still in progress in the background.
              const idx = Math.round(self.progress * totalFrames);
              const frame = frames[idx];
              if (frame) ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
            },
          });

          return () => {};
        });
      }, section);

      // ── Extract frames in the background — animation is already live above ──
      // Seeks are slow on standard H.264 because each one must decode from the
      // nearest keyframe. Pulling every frame into ImageBitmap means
      // onUpdate becomes a simple array lookup + canvas draw — always < 1ms.
      for (let i = 0; i <= totalFrames; i++) {
        if (!mounted) return;
        await seekTo((i / totalFrames) * video.duration);
        if (!mounted) return;
        frames[i] = await createImageBitmap(video);
        // Yield to the browser between seeks so the page stays responsive
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
      {/* ── Desktop: scroll-pinned product reveal ── */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative bg-white border-t border-zinc-100"
        style={{ height: "100vh" }}
      >
        {/* Hidden video — source for frame extraction only */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          <source src="/videos/rotating-pest-control-backpack.mp4" type="video/mp4" />
        </video>

        {/* Canvas renders the pre-extracted frames — instant draw, no seek lag */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Gradient so text stays legible over the canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent pointer-events-none" />

        {/* Cycling text panels */}
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

      {/* ── Mobile: sticky video + scroll-animated panels ── */}
      <section className="lg:hidden bg-white border-t border-zinc-100">
        {/* Sticky product visual */}
        <div className="sticky top-0 z-10 h-[45dvh] bg-zinc-800 overflow-hidden flex items-center justify-center">
          <video
            ref={mobileVideoRef}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="h-full w-full object-contain"
          >
            <source src="/videos/rotating-pest-control-backpack.mp4" type="video/mp4" />
          </video>
          {/* Fade bottom edge into the white panel area */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </div>

        {/* Panels scroll up over the sticky video */}
        <div className="max-w-lg mx-auto px-6 pt-4 pb-16 space-y-14">
          {panels.map(({ id, kicker, headline, body }, i) => (
            <div
              key={id}
              ref={(el) => { mobilePanelRefs.current[i] = el; }}
              style={reduce ? undefined : {
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
              }}
            >
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
