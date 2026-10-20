"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Pixel = {
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
};

type Spark = {
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  size: number;
  color: string;
  delay: number;
};

export default function PixelReveal({ locale, variant = "home" }: { locale: "ru" | "en"; variant?: "home" | "contact" }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!image) return;

    const revealImmediately = () => {
      image.style.opacity = "1";
      if (canvas) canvas.style.opacity = "0";
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      revealImmediately();
      return;
    }

    if (!canvas || !context) {
      revealImmediately();
      return;
    }

    let frameId = 0;
    let cancelled = false;
    let started = false;
    let inView = false;

    const reveal = () => {
      if (started || cancelled) return;
      started = true;

      const bounds = canvas.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;
      if (!width || !height || !image.naturalWidth) {
        revealImmediately();
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sample = document.createElement("canvas");
      sample.width = Math.round(width);
      sample.height = Math.round(height);
      const sampleContext = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) {
        revealImmediately();
        return;
      }

      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const objectPositionY = variant === "contact" ? 0.3 : 0.5;
      sampleContext.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) * objectPositionY, drawWidth, drawHeight);

      let pixelsData: Uint8ClampedArray;
      try {
        pixelsData = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
      } catch {
        revealImmediately();
        return;
      }

      // Hide the real photo only after we know the pixel canvas is ready.
      image.style.opacity = "0";
      canvas.style.opacity = "1";
      const cellSize = reducedMotion
        ? width < 480 ? 19 : 16
        : width < 480 ? 16 : 13;
      const pixels: Pixel[] = [];

      for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
          const sampleX = Math.min(Math.floor(x + cellSize / 2), sample.width - 1);
          const sampleY = Math.min(Math.floor(y + cellSize / 2), sample.height - 1);
          const offset = (sampleY * sample.width + sampleX) * 4;
          const red = pixelsData[offset];
          const green = pixelsData[offset + 1];
          const blue = pixelsData[offset + 2];
          const isAccent = Math.random() < 0.025;

          const travel = reducedMotion ? 0.72 : 1.7;
          pixels.push({
            targetX: x,
            targetY: y,
            startX: reducedMotion ? x + (Math.random() - 0.5) * width * travel : (Math.random() * 1.7 - 0.35) * width,
            startY: reducedMotion ? y + (Math.random() - 0.5) * height * travel : (Math.random() * 1.7 - 0.35) * height,
            size: cellSize + 0.5,
            color: isAccent
              ? Math.random() < 0.7 ? "rgba(179,0,45,0.9)" : "rgba(255,255,255,0.85)"
              : `rgba(${red},${green},${blue},${pixelsData[offset + 3] / 255})`,
            delay: Math.random() * (reducedMotion ? 0.16 : 0.62),
            duration: reducedMotion ? 2 + Math.random() * 0.25 : 3.55 + Math.random() * 0.7,
          });
        }
      }

      const sparkStart = reducedMotion ? 2.2 : 4.05;
      const sparkDuration = reducedMotion ? 0.65 : 0.78;
      const sparks: Spark[] = Array.from({ length: 15 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        driftX: (Math.random() - 0.5) * 38,
        driftY: (Math.random() - 0.5) * 38,
        size: 1 + Math.random() * 2,
        color: Math.random() < 0.72 ? "rgba(255,255,255,0.9)" : "rgba(255,26,77,0.95)",
        delay: sparkStart + Math.random() * (reducedMotion ? 0.12 : 0.35),
      }));

      const duration = reducedMotion ? 3.1 : 5.25;
      const revealAt = reducedMotion ? 2.35 : 4.35;
      const startTime = performance.now();
      image.style.transition = "opacity 780ms ease";
      canvas.style.transition = "opacity 780ms ease";

      const drawFrame = (now: number) => {
        if (cancelled) return;
        const elapsed = Math.min((now - startTime) / 1000, duration);
        context.clearRect(0, 0, width, height);

        for (const pixel of pixels) {
          const progress = Math.max(0, Math.min((elapsed - pixel.delay) / pixel.duration, 1));
          if (progress <= 0) {
            context.globalAlpha = 0.92;
            context.fillStyle = pixel.color;
            context.fillRect(pixel.startX, pixel.startY, pixel.size, pixel.size);
            continue;
          }

          const eased = progress * progress * (3 - 2 * progress);
          const x = pixel.startX + (pixel.targetX - pixel.startX) * eased;
          const y = pixel.startY + (pixel.targetY - pixel.startY) * eased;
          context.globalAlpha = 1;
          context.fillStyle = pixel.color;
          context.fillRect(x, y, pixel.size, pixel.size);
        }

        const sparkProgress = Math.max(0, Math.min((elapsed - sparkStart) / sparkDuration, 1));
        for (const spark of sparks) {
          const localProgress = Math.max(0, Math.min((elapsed - spark.delay) / sparkDuration, 1));
          context.globalAlpha = (1 - localProgress) * 0.8;
          context.fillStyle = spark.color;
          context.fillRect(
            spark.x + spark.driftX * localProgress,
            spark.y + spark.driftY * localProgress,
            spark.size,
            spark.size,
          );
        }
        context.globalAlpha = 1;

        if (elapsed >= revealAt) {
          image.style.opacity = "1";
          canvas.style.opacity = String(Math.max(0, 1 - (elapsed - revealAt) / 0.78));
        }

        if (elapsed < duration || sparkProgress < 1) {
          frameId = window.requestAnimationFrame(drawFrame);
        } else {
          revealImmediately();
          context.clearRect(0, 0, width, height);
        }
      };

      frameId = window.requestAnimationFrame(drawFrame);
    };

    const revealWhenReady = () => {
      if (!inView || !image.complete || !image.naturalWidth) return;
      image.parentElement?.classList.add("portrait-effects-active");
      reveal();
    };
    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver((entries) => {
          inView = entries.some((entry) => entry.isIntersecting);
          if (inView) revealWhenReady();
        }, { threshold: 0.03, rootMargin: "0px 0px 40px 0px" });
    observer?.observe(canvas);
    if (!observer) inView = true;

    if (image.complete) {
      if (image.naturalWidth) revealWhenReady();
      else revealImmediately();
    } else {
      image.addEventListener("load", revealWhenReady, { once: true });
      image.addEventListener("error", revealImmediately, { once: true });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      image.parentElement?.classList.remove("portrait-effects-active");
      image.removeEventListener("load", revealWhenReady);
      image.removeEventListener("error", revealImmediately);
    };
  }, [variant]);

  return (
    <>
      <Image
        ref={imageRef}
        src="/noctis-portrait.png"
        alt={locale === "ru" ? "Портрет Noctis Raven" : "Portrait of Noctis Raven"}
        fill
        priority
        sizes={variant === "contact" ? "(max-width: 768px) 88vw, 40vw" : "(max-width: 1024px) 94vw, 52vw"}
        className={`cyber-glitch-base object-cover opacity-100 transition-transform duration-700 group-hover:scale-[1.04] ${variant === "contact" ? "object-[center_30%]" : "object-center"}`}
      />
      <Image
        src="/noctis-portrait.png"
        alt=""
        aria-hidden="true"
        fill
        sizes={variant === "contact" ? "(max-width: 768px) 88vw, 40vw" : "(max-width: 1024px) 94vw, 52vw"}
        className={`cyber-glitch-layer cyber-glitch-layer-red object-cover ${variant === "contact" ? "object-[center_30%]" : "object-center"}`}
      />
      <Image
        src="/noctis-portrait.png"
        alt=""
        aria-hidden="true"
        fill
        sizes={variant === "contact" ? "(max-width: 768px) 88vw, 40vw" : "(max-width: 1024px) 94vw, 52vw"}
        className={`cyber-glitch-layer cyber-glitch-layer-cyan object-cover ${variant === "contact" ? "object-[center_30%]" : "object-center"}`}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-0" />
    </>
  );
}

