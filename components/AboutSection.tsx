"use client";

import { motion } from "framer-motion";
import { skills } from "../lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-[1600px] px-6 pb-24 sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#8d8890]">Обо мне</p>
          <h2 className="text-4xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5] sm:text-5xl">
            История бренда
          </h2>
          <p className="max-w-xl text-base leading-8 text-[#b9b2bc]">
            Noctis Raven — цифровой мастер, который объединяет готическое обаяние, кибернетическую элегантность и кинематографичный сторителлинг. Работы строятся на слоях текстур, точной анимации и премиальной визуальной лексике.
          </p>
          <div className="space-y-4 rounded-2xl border border-white/10 bg-[#151418]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Опыт</span>
              <span className="text-2xl font-semibold text-[#f8f5f5]">8+ лет</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Клиенты</span>
              <span className="text-2xl font-semibold text-[#f8f5f5]">Роскошные студии и независимые бренды</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Фокус</span>
              <span className="text-2xl font-semibold text-[#f8f5f5]">Цифровые продукты с историей</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-white/10 bg-[#151418]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Ключевые навыки</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div key={skill} className="rounded-3xl border border-white/10 bg-[#101014]/90 px-4 py-3 text-sm text-[#d4ced2] shadow-[inset_0_0_20px_rgba(255,26,77,0.06)]">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#151418]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Креативный процесс</p>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-[#c9c2c9]">
              <li className="rounded-3xl border border-[#ff1a4d]/10 bg-[#111014]/90 p-4">
                <strong className="text-[#f8f5f5]">Исследование</strong> — изучаю настроение, энергию бренда и историю.
              </li>
              <li className="rounded-3xl border border-[#ff1a4d]/10 bg-[#111014]/90 p-4">
                <strong className="text-[#f8f5f5]">Концепт</strong> — создаю чёткие визуалы, премиальные композиции и сюжетную структуру.
              </li>
              <li className="rounded-3xl border border-[#ff1a4d]/10 bg-[#111014]/90 p-4">
                <strong className="text-[#f8f5f5]">Реализация</strong> — готовый арт, интерактивные продукты и брендовое окружение.
              </li>
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
