"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CRESVIA 360 - Pixel reveal image
 * Starts heavily pixelated and resolves to full clarity when the
 * image scrolls into view - each card resolves one after another
 * as you scroll, never before.
 * Final state is the plain <img>: the canvas removes itself, so SSR,
 * SEO and right-click save all behave like a normal image.
 * Requires: gsap (already installed).
 */
export function PixelImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const img = new Image();
    img.src = src;
    let tween: ReturnType<typeof gsap.to> | undefined;
    let trigger: ScrollTrigger | undefined;

    img.onload = () => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
      if (!octx) return;

      const state = { p: 56 };
      const draw = () => {
        const px = Math.max(1, Math.round(state.p));
        const sw = Math.max(1, Math.floor(width / px));
        const sh = Math.max(1, Math.floor(height / px));
        off.width = sw;
        off.height = sh;
        octx.drawImage(img, 0, 0, sw, sh);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(off, 0, 0, sw, sh, 0, 0, width, height);
      };

      draw();

      tween = gsap.to(state, {
        p: 1,
        duration: 1.4,
        ease: "power2.inOut",
        paused: true,
        onUpdate: draw,
        onComplete: () => setDone(true),
      });

      trigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top 85%",
        once: true,
        onEnter: () => tween?.play(),
      });
    };

    return () => {
      trigger?.kill();
      tween?.kill();
    };
  }, [src, width, height]);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <img src={src} alt={alt} width={width} height={height} className={className} />
      {!done && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />}
    </div>
  );
}
