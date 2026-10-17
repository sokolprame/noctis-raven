"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  lifespan: number;
  size: number;
  phase: number;
  color: string;
};

const colors = ["rgba(255,255,255,0.5)", "rgba(179,0,45,0.72)", "rgba(255,26,77,0.58)"];

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let lastFrame = 0;
    let particles: Particle[] = [];

    const createParticle = (randomPosition = false): Particle => {
      const edge = Math.floor(Math.random() * 4);
      let x = Math.random() * width;
      let y = Math.random() * height;

      if (!randomPosition) {
        if (edge === 0) { x = -8; y = Math.random() * height; }
        else if (edge === 1) { x = width + 8; y = Math.random() * height; }
        else if (edge === 2) { x = Math.random() * width; y = -8; }
        else { x = Math.random() * width; y = height + 8; }
      }

      return {
        x,
        y,
        vx: -(3 + Math.random() * 8),
        vy: -(2 + Math.random() * 6),
        age: randomPosition ? Math.random() * 8 : 0,
        lifespan: 9 + Math.random() * 12,
        size: 0.7 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.random() < 0.13 ? 2 : Math.random() < 0.35 ? 1 : 0],
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 5 : width < 1024 ? 8 : 13;
      particles = Array.from({ length: count }, () => createParticle(true));
    };

    const render = (timestamp: number) => {
      if (document.hidden) {
        frameId = 0;
        return;
      }

      if (timestamp - lastFrame < 40) {
        frameId = window.requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((timestamp - (lastFrame || timestamp)) / 1000, 0.06);
      lastFrame = timestamp;
      context.clearRect(0, 0, width, height);

      particles = particles.map((particle) => {
        particle.age += delta;
        particle.phase += delta * 0.42;
        particle.x += (particle.vx + Math.sin(particle.phase) * 1.8) * delta;
        particle.y += (particle.vy + Math.cos(particle.phase * 0.8) * 1.2) * delta;

        if (particle.age >= particle.lifespan || particle.x < -18 || particle.y < -18) {
          return createParticle();
        }

        const lifeProgress = particle.age / particle.lifespan;
        const fadeIn = Math.min(lifeProgress * 5, 1);
        const fadeOut = Math.min((1 - lifeProgress) * 4, 1);
        const alpha = Math.max(0, Math.min(fadeIn, fadeOut)) * 0.48;

        context.globalAlpha = alpha;
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = 7;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
        return particle;
      });

      context.globalAlpha = 1;
      frameId = window.requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        return;
      }

      lastFrame = 0;
      if (!frameId) frameId = window.requestAnimationFrame(render);
    };

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        context.clearRect(0, 0, width, height);
      } else if (!frameId && !document.hidden) {
        lastFrame = 0;
        frameId = window.requestAnimationFrame(render);
      }
    };

    resize();
    frameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="ambient-backdrop" />
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />
    </>
  );
}

