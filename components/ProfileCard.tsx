"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { socials } from "../lib/data";
import { Send, Camera, Music, Share2, MapPin } from "lucide-react";

const iconMap = {
  Telegram: Send,
  Instagram: Camera,
  TikTok: Music,
  VK: Share2,
};

export default function ProfileCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto -mt-20 mb-20 max-w-[1600px] px-6 sm:px-8 lg:px-10"
    >
      <div className="glass-card relative overflow-hidden rounded-[36px] border border-white/10 bg-[#09090b]/80 px-6 py-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8 sm:py-8">
        <div className="absolute -right-16 top-12 h-40 w-40 rounded-full bg-[#ff1a4d]/10 blur-3xl" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-[#ff1a4d]/10 bg-[#0b0a0d]/80 p-6 shadow-[inset_0_0_35px_rgba(255,26,77,0.05)]">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border border-[#ff1a4d]/20 bg-[#110b13]/80 shadow-[0_0_28px_rgba(179,0,45,0.22)]">
                  <Image src="/avatar.jpg" alt="Noctis Raven" fill className="object-cover" />
                </div>
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#a49fa4]">Цифровой художник и веб-креатор</p>
                  <h2 className="text-4xl font-semibold uppercase tracking-[0.24em] text-[#f7f3f3]">Noctis Raven</h2>
                  <p className="max-w-xl text-sm leading-7 text-[#d1cfd2]">
                    Создаю персонажей, визуальные концепты и цифровые пространства. Объединяю искусство и технологии, чтобы создавать уникальные проекты от идеи до реализации.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#ff1a4d]/20 bg-[#09080c]/80 px-4 py-2 text-sm text-[#ff9bb1]">
                    <MapPin className="h-4 w-4" /> Россия, Касимов
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff1a4d] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#ff345f]"
                >
                  Сообщение
                  <Send className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0a0f]/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5] transition hover:border-[#ff1a4d]/30"
                >
                  Ещё
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b0a0d]/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Обо мне</p>
              <div className="mt-6 space-y-4 text-sm leading-7 text-[#d1cfd2]">
                <p>
                  Художник. Разработчик. Создатель. Объединяю искусство и технологию, чтобы создавать уникальные проекты от идеи до реализации.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff1a4d]" /> Персонажи и концепты
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff1a4d]" /> Иллюстрации и дизайн
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff1a4d]" /> Веб-разработка (Django, Tailwind)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff1a4d]" /> UI/UX дизайн
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] border border-white/10 bg-[#0b0a0d]/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Контакты</p>
              <div className="mt-6 space-y-3">
                {socials.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#09090c]/80 px-5 py-4 text-sm text-[#d7d4d6] transition hover:border-[#ff1a4d]/40 hover:bg-[#12050a]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon className="h-4 w-4 text-[#ff1a4d]" />
                        {item.label}
                      </span>
                      <span className="text-[#8f8a91]">→</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0b0a0d]/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Рекомендации</p>
              <p className="mt-5 text-sm leading-7 text-[#d1cfd2]">
                Я создаю миры. Персонажи. Истории. Интерфейсы. Если у вас есть идея — я превращаю её в реальность.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
