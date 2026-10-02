"use client";

import { motion } from "framer-motion";
import { feedItems } from "../lib/data";

export default function FeedSection() {
  return (
    <section id="feed" className="relative mx-auto max-w-[1600px] px-6 pb-24 sm:px-8 lg:px-10">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[#8d8890]">Лента</p>
        <h2 className="mt-4 text-4xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5] sm:text-5xl">
          Последние работы
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#b9b2bc]">
          Текущие креативные обновления и студийные релизы в премиальном формате.
        </p>
      </div>

      <div className="space-y-6">
        {feedItems.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="rounded-4xl border border-white/10 bg-[#0c0b0f]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">{item.label}</p>
                <h3 className="mt-3 text-2xl font-semibold text-[#f8f5f5]">{item.title}</h3>
              </div>
              <span className="rounded-full border border-[#ff1a4d]/20 bg-[#111014]/80 px-4 py-2 text-sm uppercase tracking-[0.35em] text-[#ff9bb1]">
                {item.date}
              </span>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#c9c2c9]">{item.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
