"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    if (mediaQuery.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handlePointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.closest("a, button, input, textarea, [role='button']") !== null ||
        target instanceof HTMLButtonElement ||
        target instanceof HTMLAnchorElement;
      setHovering(isInteractive);
    };

    const handlePointerLeave = () => setHovering(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
          hovering ? "h-14 w-14 border-[#ff1a4d]/70 bg-[#ff1a4d]/10 text-[9px] text-[#f5f5f5]" : "border-white/30 bg-white/5"
        }`}
      >
        {hovering ? "VIEW" : ""}
      </div>
    </div>
  );
}
