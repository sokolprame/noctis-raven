"use client";

import { useEffect, useRef } from "react";

export default function CyberpunkGlitchDemoPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "/noctis-portrait.png";
    image.crossOrigin = "anonymous";

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrame = 0;
    let lastGlitchAt = 0;
    let nextGlitchAt = 1800;
    let lastCriticalAt = 0;
    let nextCriticalAt = 7000;
    let pointerX = 0;
    let pointerY = 0;
    let targetIntensity = 0;
    let currentIntensity = 0;
    let criticalState = 0;

    const resize = () => {
      const rect = frame.getBoundingClientRect();
      width = Math.max(280, rect.width);
      height = Math.max(360, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBase = (time: number) => {
      if (!image.complete) return;

      const localX = (pointerX / width) * 2 - 1;
      const localY = (pointerY / height) * 2 - 1;
      const parallaxX = localX * 12;
      const parallaxY = localY * 10;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#070b12";
      ctx.fillRect(0, 0, width, height);

      const drawW = width;
      const drawH = height;
      const imgRatio = image.width / image.height;
      const targetAspect = drawW / drawH;
      let sw = image.width;
      let sh = image.height;
      let sx = 0;
      let sy = 0;

      if (imgRatio > targetAspect) {
        sh = image.height;
        sw = image.height * targetAspect;
        sx = (image.width - sw) / 2;
      } else {
        sw = image.width;
        sh = image.width / targetAspect;
        sy = (image.height - sh) / 2;
      }

      const pulse = 0.96 + Math.sin(time * 0.0018) * 0.06;
      ctx.filter = `contrast(${1.1 + currentIntensity * 0.6}) brightness(${pulse + currentIntensity * 0.6}) saturate(${1.08 + currentIntensity * 1.4})`;
      ctx.drawImage(image, sx, sy, sw, sh, parallaxX, parallaxY, drawW, drawH);
      ctx.filter = "none";

      const scanlineAlpha = 0.12 + currentIntensity * 0.18;
      for (let y = 0; y < height; y += 3) {
        ctx.fillStyle = `rgba(10, 14, 20, ${scanlineAlpha})`;
        ctx.fillRect(0, y, width, 1.2);
      }

      if (currentIntensity > 0.12) {
        for (let i = 0; i < 80; i += 1) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const s = Math.random() * 2.4;
          ctx.fillStyle = i % 3 === 0 ? "rgba(255,70,110,0.18)" : i % 2 === 0 ? "rgba(60,200,255,0.12)" : "rgba(255,255,255,0.08)";
          ctx.fillRect(x, y, s, s);
        }
      }
    };

    const triggerGlitch = (isCritical = false) => {
      const burstIntensity = isCritical
        ? 1.1 + Math.random() * 0.9
        : 0.45 + Math.random() * 0.7 + currentIntensity * 0.6;
      const sliceCount = isCritical ? 14 + Math.floor(Math.random() * 18) : 5 + Math.floor(Math.random() * 10);

      for (let i = 0; i < sliceCount; i += 1) {
        const sliceWidth = isCritical ? 10 + Math.random() * 90 : 18 + Math.random() * 50;
        const x = Math.random() * (width - sliceWidth);
        const y = Math.random() * height;
        const shift = (Math.random() - 0.5) * (isCritical ? 65 : 18 + burstIntensity * 50);

        const imageData = ctx.getImageData(x, y, sliceWidth, Math.min(height - y, isCritical ? 38 : 28));
        ctx.putImageData(imageData, x + shift, y + (Math.random() - 0.5) * (isCritical ? 12 : 8));

        ctx.fillStyle = `rgba(255, 70, 110, ${0.09 + burstIntensity * 0.2})`;
        ctx.fillRect(x, y, sliceWidth, 1 + Math.random() * (isCritical ? 22 : 8));

        ctx.fillStyle = `rgba(70, 220, 255, ${0.06 + burstIntensity * 0.18})`;
        ctx.fillRect(x + 2, y + 2, sliceWidth * 0.7, 1 + Math.random() * (isCritical ? 12 : 4));
      }

      if (isCritical) {
        const ghostOffset = 4 + Math.random() * 10;
        ctx.save();
        ctx.filter = "brightness(1.4) contrast(1.5)";
        ctx.drawImage(canvas, 0, 0, width, height, -ghostOffset, 0, width, height);
        ctx.drawImage(canvas, 0, 0, width, height, ghostOffset, 0, width, height);
        ctx.restore();

        for (let i = 0; i < 22; i += 1) {
          const blockX = Math.random() * width;
          const blockY = Math.random() * height;
          const blockW = 6 + Math.random() * 26;
          const blockH = 6 + Math.random() * 18;
          ctx.fillStyle = i % 3 === 0 ? "rgba(255,255,255,0.85)" : i % 2 === 0 ? "rgba(70,220,255,0.75)" : "rgba(255,40,90,0.75)";
          ctx.fillRect(blockX, blockY, blockW, blockH);
        }

        ctx.fillStyle = "rgba(255,255,255,0.24)";
        for (let y = 0; y < height; y += 2) {
          if (Math.random() > 0.74) {
            ctx.fillRect(0, y, width, 1 + Math.random() * 3);
          }
        }

        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(0, 0, width, 1 + Math.random() * 3);
      }

      ctx.save();
      ctx.filter = `contrast(${1.35 + burstIntensity}) brightness(${1.2 + burstIntensity})`;
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    const animate = (time: number) => {
      currentIntensity += (targetIntensity - currentIntensity) * 0.08;
      drawBase(time);

      if (time - lastCriticalAt > nextCriticalAt) {
        lastCriticalAt = time;
        nextCriticalAt = 5000 + Math.random() * 5000;
        criticalState = 1;
      }

      if (criticalState > 0) {
        criticalState = Math.max(0, criticalState - 0.02);
        const criticalPulse = criticalState * (0.6 + Math.random() * 0.5);
        const jitter = criticalState > 0.2 ? (Math.random() - 0.5) * 3 : 0;

        ctx.save();
        ctx.translate(jitter, 0);
        triggerGlitch(true);
        ctx.restore();

        if (criticalPulse > 0.1) {
          ctx.fillStyle = `rgba(255,255,255,${criticalPulse * 0.12})`;
          ctx.fillRect(0, 0, width, height);
        }

        if (criticalState <= 0.01) {
          criticalState = 0;
          ctx.globalAlpha = 1;
        }
      }

      if (time - lastGlitchAt > nextGlitchAt) {
        lastGlitchAt = time;
        nextGlitchAt = 1800 + Math.random() * 3200;
        triggerGlitch();
      }

      if (Math.random() < 0.015 && currentIntensity > 0.2) {
        triggerGlitch();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      targetIntensity = 0.24 + Math.min(0.76, Math.hypot(pointerX - rect.width / 2, pointerY - rect.height / 2) / 420);
    };

    const onPointerLeave = () => {
      targetIntensity = 0;
    };

    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    resize();
    image.onload = () => {
      animationFrame = requestAnimationFrame(animate);
    };

    return () => {
      cancelAnimationFrame(animationFrame);
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05070b] p-10 text-white">
      <div className="w-full max-w-115">
        <div
          ref={frameRef}
          className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#070b12] shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
          style={{
            aspectRatio: "4 / 5",
            boxShadow: "inset 0 0 24px rgba(47, 196, 255, 0.08), 0 0 30px rgba(255, 0, 102, 0.08)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(80,190,255,0.13),transparent_40%),radial-gradient(circle_at_60%_80%,rgba(255,30,92,0.12),transparent_40%)]" />
          <canvas ref={canvasRef} className="relative z-10 block h-full w-full" />
          <div className="pointer-events-none absolute inset-0 z-20 rounded-[30px] border border-cyan-400/20" />
        </div>
      </div>
    </main>
  );
}
