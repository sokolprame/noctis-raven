"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, LayoutGrid, Paintbrush } from "lucide-react";
import { services } from "../lib/data";

const iconMap = {
  Web: Code2,
  Illustration: Paintbrush,
  Ui: LayoutGrid,
  Brand: BookOpen,
};

export default function ServiceSection() {
  return (
    <section id="services" className="relative mx-auto max-w-[1600px] px-6 pb-24 sm:px-8 lg:px-10">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[#8d8890]">Услуги</p>
        <h2 className="mt-4 text-4xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5] sm:text-5xl">
          Премиальные возможности
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#b9b2bc]">
          От авторских иллюстраций до высокопроизводительных веб-систем — каждая услуга создаётся для тёмных люксовых брендов с акцентом на историю.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap];
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151418]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:border-[#d8a0ad]/25"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d8a0ad]/20 bg-[#21191e]/90 text-[#d8a0ad]">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-[#f8f5f5]">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#c9c2c9]">{service.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-[#b9b2bc]">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff1a4d]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="rounded-full border border-[#ff1a4d]/25 bg-[#0b0a0f]/80 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#ff1a4d] transition hover:bg-[#12030c]">
          Показать все услуги
        </button>
      </div>
    </section>
  );
}
