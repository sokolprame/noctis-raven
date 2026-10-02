"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

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

const playedKey = "noctis:hero-pixel-reveal:v5";

export default function PixelReveal({ locale }: { locale: "ru" | "en" }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!image) return;

    const revealImmediately = () => {
      image.style.opacity = "1";
      if (canvas) canvas.style.opacity = "0";
    };

    const revealWithFade = (duration = 900) => {
      if (canvas) canvas.style.opacity = "0";
      if (typeof image.animate !== "function") {
        revealImmediately();
        return;
      }

      const fade = image.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration, easing: "ease-out", fill: "both" },
      );
      fade.onfinish = () => {
        image.style.opacity = "1";
        fade.cancel();
      };
    };

    const revealWhenImageReady = (animate: boolean) => {
      const showImage = () => {
        if (animate) revealWithFade(850);
        else revealImmediately();
      };

      if (image.complete && image.naturalWidth) {
        showImage();
        return;
      }

      image.addEventListener("load", showImage, { once: true });
      image.addEventListener("error", revealImmediately, { once: true });
      return () => {
        image.removeEventListener("load", showImage);
        image.removeEventListener("error", revealImmediately);
      };
    };

    let alreadyPlayed = false;
    try {
      alreadyPlayed = window.sessionStorage.getItem(playedKey) === "1";
    } catch {
      // Continue with the one-time reveal when storage is unavailable.
    }

    if (reduceMotion || alreadyPlayed) {
      return revealWhenImageReady(reduceMotion === true && !alreadyPlayed);
    }

    if (!canvas || !context) {
      return revealWhenImageReady(true);
    }

    let frameId = 0;
    let cancelled = false;
    let started = false;

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
      sampleContext.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);

      let pixelsData: Uint8ClampedArray;
      try {
        pixelsData = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
      } catch {
        revealWithFade();
        return;
      }
      const cellSize = width < 480 ? 16 : 13;
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

          pixels.push({
            targetX: x,
            targetY: y,
            startX: (Math.random() * 1.7 - 0.35) * width,
            startY: (Math.random() * 1.7 - 0.35) * height,
            size: cellSize + 0.5,
            color: isAccent
              ? Math.random() < 0.7 ? "rgba(179,0,45,0.9)" : "rgba(255,255,255,0.85)"
              : `rgba(${red},${green},${blue},${pixelsData[offset + 3] / 255})`,
            delay: Math.random() * 0.62,
            duration: 3.55 + Math.random() * 0.7,
          });
        }
      }

      const sparks: Spark[] = Array.from({ length: 15 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        driftX: (Math.random() - 0.5) * 38,
        driftY: (Math.random() - 0.5) * 38,
        size: 1 + Math.random() * 2,
        color: Math.random() < 0.72 ? "rgba(255,255,255,0.9)" : "rgba(255,26,77,0.95)",
        delay: 4.05 + Math.random() * 0.35,
      }));

      const duration = 5.25;
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

        const sparkProgress = Math.max(0, Math.min((elapsed - 4.05) / 0.78, 1));
        for (const spark of sparks) {
          const localProgress = Math.max(0, Math.min((elapsed - spark.delay) / 0.78, 1));
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

        if (elapsed >= 4.35) {
          image.style.opacity = "1";
          canvas.style.opacity = String(Math.max(0, 1 - (elapsed - 4.35) / 0.78));
        }

        if (elapsed < duration || sparkProgress < 1) {
          frameId = window.requestAnimationFrame(drawFrame);
        } else {
          revealImmediately();
          context.clearRect(0, 0, width, height);
          try {
            window.sessionStorage.setItem(playedKey, "1");
          } catch {
            // The animation completed; storage is only used to avoid replay during navigation.
          }
        }
      };

      frameId = window.requestAnimationFrame(drawFrame);
    };

    if (image.complete && image.naturalWidth) {
      reveal();
    } else {
      image.addEventListener("load", reveal, { once: true });
      image.addEventListener("error", revealImmediately, { once: true });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      image.removeEventListener("load", reveal);
      image.removeEventListener("error", revealImmediately);
    };
  }, [reduceMotion]);

  return (
    <>
      <Image
        ref={imageRef}
        src="/noctis-portrait.png"
        alt={locale === "ru" ? "Портрет Noctis Raven" : "Portrait of Noctis Raven"}
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 38vw"
        className="object-cover object-center opacity-0 transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
    </>
  );
}
