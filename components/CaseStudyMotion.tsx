"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

export function CaseReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`case-reveal ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

export function CaseVisual({
  src,
  alt,
  className,
  imageClassName = "",
  children,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className: string;
  imageClassName?: string;
  children?: ReactNode;
  fit?: "cover" | "contain";
}) {
  const imageStyle: CSSProperties = {
    backgroundImage: `url("${src}")`,
    backgroundSize: fit,
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 -inset-y-3 bg-center bg-no-repeat ${imageClassName} motion-reduce:transform-none motion-reduce:transition-none`}
        style={imageStyle}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-black/10" />
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}
