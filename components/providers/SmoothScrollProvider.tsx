"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      syncTouch: false, // avoids iOS Safari stutter
    });

    let rafFn: ((time: number) => void) | null = null;

    // Connect Lenis to GSAP's ticker so ScrollTrigger (used in ProductScroll)
    // stays perfectly in sync with Lenis' smooth-scroll position.
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      lenis.on("scroll", ScrollTrigger.update);
      rafFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(rafFn);
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      lenis.destroy();
      if (rafFn) {
        import("gsap").then(({ gsap }) => gsap.ticker.remove(rafFn!));
      }
    };
  }, []);

  return <>{children}</>;
}
