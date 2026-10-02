"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function PixelReveal({ locale }: { locale: "ru" | "en" }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const context = canvas?.getContext("2d");

    if (!image || !canvas || !frame || !context) return;

    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let hover = 0;
    let glitch = 0;
    let critical = 0;
    let rafId = 0;
    let lastBurstAt = 0;
    let nextBurstAt = 2200 + Math.random() * 2800;
    let lastCriticalAt = 0;
    let nextCriticalAt = 6500 + Math.random() * 3500;

    const resize = () => {
      const rect = frame.getBoundingClientRect();
      width = rect.width || 560;
      height = rect.height || 700;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const triggerNormalBurst = (now: number) => {
      glitch = 0.3 + Math.random() * 0.8;
      lastBurstAt = now;
      nextBurstAt = 2200 + Math.random() * 2800;
    };

    const triggerCriticalBurst = (now: number) => {
      critical = 1;
      glitch = 1.2;
      lastCriticalAt = now;
      nextCriticalAt = 6000 + Math.random() * 4000;
    };

    const render = (now: number) => {
      if (!image.complete) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const rect = frame.getBoundingClientRect();
      width = rect.width || 560;
      height = rect.height || 700;
      const isMobile = width < 480;

      const dx = pointerX - width / 2;
      const dy = pointerY - height / 2;
      hover += (Math.min(1, Math.hypot(dx, dy) / (isMobile ? 300 : 240)) - hover) * 0.08;

      const intensity = Math.min(1, hover * (isMobile ? 0.55 : 0.8) + glitch * (isMobile ? 0.6 : 0.9) + critical * 1.2);
      const parallaxX = (pointerX / Math.max(width, 1) - 0.5) * (isMobile ? 10 : 18);
      const parallaxY = (pointerY / Math.max(height, 1) - 0.5) * (isMobile ? 8 : 14);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#070b12";
      context.fillRect(0, 0, width, height);

      context.save();
      context.filter = `brightness(${0.96 + intensity * 0.22}) contrast(${1.08 + intensity * 0.5}) saturate(${1.08 + intensity * 0.7})`;
      context.drawImage(image, parallaxX, parallaxY, width, height);
      context.restore();

      if (glitch > 0.08 || critical > 0.04) {
        const segments = critical > 0.1 ? (isMobile ? 9 : 14) : isMobile ? 5 : 8;
        for (let i = 0; i < segments; i += 1) {
          const y = (i / segments) * height;
          const sliceHeight = Math.max(3, height / segments);
          const shift = (Math.random() - 0.5) * (critical > 0.1 ? (isMobile ? 30 : 48) : 20 + intensity * (isMobile ? 40 : 70));
          const channelShift = critical > 0.1 ? (Math.random() - 0.5) * (isMobile ? 8 : 14) : 0;

          context.globalAlpha = critical > 0.1 ? 0.42 + critical * 0.35 : 0.16 + glitch * 0.2;
          context.drawImage(image, shift + channelShift, y, width, sliceHeight, 0, y, width, sliceHeight);

          context.globalAlpha = critical > 0.1 ? 0.18 + critical * 0.28 : 0.12 + glitch * 0.16;
          context.fillStyle = i % 2 === 0 ? "rgba(255,72,108,0.18)" : "rgba(90,220,255,0.14)";
          context.fillRect(0, y, width, sliceHeight);
          context.globalAlpha = 1;
        }
      }

      if (critical > 0.08) {
        const ghostOffset = 8 + critical * 16;
        context.save();
        context.globalAlpha = 0.32 + critical * 0.4;
        context.drawImage(image, ghostOffset, 0, width, height);
        context.translate(-ghostOffset, 0);
        context.drawImage(image, 0, 0, width, height);
        context.restore();

        for (let i = 0; i < 18; i += 1) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const w = 8 + Math.random() * 28;
          const h = 4 + Math.random() * 16;
          const color = i % 3 === 0 ? "rgba(255,255,255,0.8)" : i % 2 === 0 ? "rgba(90,220,255,0.75)" : "rgba(255,60,100,0.8)";
          context.fillStyle = color;
          context.fillRect(x, y, w, h);
        }

        context.fillStyle = `rgba(255,255,255,${0.08 + critical * 0.14})`;
        for (let y = 0; y < height; y += 2) {
          if (Math.random() > 0.72) {
            context.fillRect(0, y, width, 2 + Math.random() * 4);
          }
        }
      }

      for (let y = 0; y < height; y += 3) {
        context.fillStyle = `rgba(8,12,18,${0.06 + intensity * 0.18})`;
        context.fillRect(0, y, width, 1.2);
      }

      if (intensity > 0.14 || critical > 0.04) {
        for (let i = 0; i < 30; i += 1) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const s = Math.random() * 2.4;
          const color = i % 3 === 0 ? "rgba(255,70,110,0.18)" : i % 2 === 0 ? "rgba(80,200,255,0.12)" : "rgba(255,255,255,0.08)";
          context.fillStyle = color;
          context.fillRect(x, y, s, s);
        }
      }

      if (critical > 0.12) {
        const jitter = (Math.random() - 0.5) * 3;
        context.translate(jitter, 0);
        context.fillStyle = `rgba(255,255,255,${0.08 + critical * 0.1})`;
        context.fillRect(0, 0, width, height);
      }

      glitch *= 0.88;
      critical *= 0.87;

      if (now - lastBurstAt > nextBurstAt) {
        triggerNormalBurst(now);
      }

      if (now - lastCriticalAt > nextCriticalAt) {
        triggerCriticalBurst(now);
      }

      rafId = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointerX = width / 2;
      pointerY = height / 2;
      hover = 0;
    };

    resize();
    if (image.complete && image.naturalWidth) {
      rafId = requestAnimationFrame(render);
    } else {
      image.addEventListener("load", () => {
        rafId = requestAnimationFrame(render);
      }, { once: true });
    }

    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div ref={frameRef} className="relative h-full w-full overflow-hidden rounded-[28px]">
        <Image
          ref={imageRef}
          src="/noctis-portrait.png"
          alt={locale === "ru" ? "Портрет Noctis Raven" : "Portrait of Noctis Raven"}
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 38vw"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 h-full w-full" />
      </div>
    </>
  );
}
