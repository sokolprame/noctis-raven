"use client";

import { motion } from "framer-motion";
import { navItems } from "../lib/data";
import { Mail, Sparkles, Home, Briefcase, LayoutGrid, MessageCircle, User } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "/": Home,
  "#services": Briefcase,
  "/portfolio": LayoutGrid,
  "#feed": MessageCircle,
  "#about": User,
  "#contact": Mail,
};

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 mx-auto flex w-full max-w-[1600px] items-center justify-between border-b border-white/10 bg-[#070506]/80 px-6 py-4 backdrop-blur-xl"
    >
      <a href="#home" className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-[#ff1a4d] sm:text-base">
        <Sparkles className="h-5 w-5 text-[#ff1a4d]" />
        NOCTIS RAVEN
      </a>

      <nav className="hidden gap-3 text-sm text-[#d1d1d1] md:flex">
        {navItems.map((item) => {
          const Icon = iconMap[item.href];
          return (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0a0f]/80 px-4 py-2 transition hover:border-[#ff1a4d]/30 hover:text-[#ff1a4d]"
            >
              <Icon className="h-4 w-4 text-[#ff1a4d]" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <a
        href="#contact"
        className="inline-flex items-center gap-2 rounded-full border border-[#ff1a4d]/30 bg-[#111111]/90 px-4 py-2 text-sm font-medium uppercase tracking-[0.25em] text-[#ff1a4d] transition hover:border-[#ff1a4d] hover:bg-[#1b020f] hover:text-white"
      >
        <Mail className="h-4 w-4" /> Контакт
      </a>
    </motion.header>
  );
}
