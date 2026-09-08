"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The retained hero animation — the connected-node network field that has
 * always sat over the hero background image.
 *
 * Carried over from the previous build, with the cursor-tracking behaviour
 * removed: the field now drifts on its own rather than reaching toward the
 * pointer, which keeps it ambient instead of a cursor effect. It still pauses
 * when scrolled out of view, skips entirely under `prefers-reduced-motion`, on
 * coarse pointers, and on narrow viewports, where it costs more than it gives.
 *
 * When it is skipped the element is not rendered at all. An idle canvas left in
 * the tree is not reliably transparent across compositors, and it sits directly
 * over the hero photograph — so leaving one mounted can black the image out.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Decide whether the field is worth running before anything is mounted.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer || window.innerWidth < 768) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 132;

    let W = 0;
    let H = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let raf: number | null = null;
    let visible = true;

    function build() {
      const rect = host!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = Math.round(W * DPR);
      canvas!.height = Math.round(H * DPR);
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(28, Math.min(86, Math.floor((W * H) / 15000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.7,
      }));
    }

    function frame() {
      ctx!.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx!.fillStyle = "rgba(255,120,120,0.6)";
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(255,110,110,${((1 - d / LINK) * 0.45).toFixed(3)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    }

    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(host);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 180);
    };
    window.addEventListener("resize", onResize);

    build();
    frame();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
