"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const result = (await response.json()) as { message?: string };
          setStatus("idle");
          setFeedback(result.message ?? "Проверьте заполнение полей.");
          return;
        }
        throw new Error("Contact API unavailable");
      }
      form.reset();
      setFeedback("Заявка отправлена. Я свяжусь с вами в ближайшее время.");
    } catch {
      const subject = encodeURIComponent(`Новая заявка от ${payload.name}`);
      const body = encodeURIComponent(`Имя: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`);
      window.location.href = `mailto:raven4noctis@gmail.com?subject=${subject}&body=${body}`;
      setFeedback("Открываю почтовое приложение для отправки заявки.");
    }
    setStatus("success");
  }

  return (
    <section id="contact" className="relative mx-auto max-w-[1600px] px-6 pb-28 sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#8d8890]">Контакт</p>
          <h2 className="mt-4 text-4xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5] sm:text-5xl">
            Начнём новый проект
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#b9b2bc]">
            Обсудим визуальную идентичность, интерфейс или арт-проект и найдём для него точную форму.
          </p>
          <div className="mt-8 flex items-center gap-4 rounded-[28px] border border-white/10 bg-[#0b0a0f]/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
            <Mail className="h-6 w-6 text-[#ff1a4d]" />
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#8f8a91]">Связаться</p>
              <p className="mt-2 text-sm text-[#d7d2d9]">raven4noctis@gmail.com</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="rounded-2xl border border-white/10 bg-[#101014]/90 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-[#d1cfd2]">
              <span>Имя</span>
              <input
                name="name"
                type="text"
                placeholder="Ваше имя"
                className="w-full rounded-3xl border border-white/10 bg-[#090909]/90 px-4 py-3 text-sm text-[#f3f1f4] outline-none transition focus:border-[#ff1a4d] focus:ring-1 focus:ring-[#ff1a4d]/30"
              />
            </label>
            <label className="space-y-2 text-sm text-[#d1cfd2]">
              <span>Эл. почта</span>
              <input
                name="email"
                type="email"
                placeholder="ваш@почта.рф"
                className="w-full rounded-3xl border border-white/10 bg-[#090909]/90 px-4 py-3 text-sm text-[#f3f1f4] outline-none transition focus:border-[#ff1a4d] focus:ring-1 focus:ring-[#ff1a4d]/30"
              />
            </label>
          </div>
          <label className="mt-4 space-y-2 text-sm text-[#d1cfd2]">
            <span>Кратко о проекте</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Опишите ваш проект в нескольких строках"
              className="w-full rounded-3xl border border-white/10 bg-[#090909]/90 px-4 py-3 text-sm text-[#f3f1f4] outline-none transition focus:border-[#ff1a4d] focus:ring-1 focus:ring-[#ff1a4d]/30"
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-[#d8a0ad] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#1b1216] transition hover:bg-[#edbac5] disabled:cursor-wait disabled:opacity-60"
          >
            {status === "loading" ? "Отправка..." : "Отправить заявку"}
            <Send className="h-4 w-4" />
          </button>
          {feedback ? <p className="mt-4 text-sm text-[#d8a0ad]" aria-live="polite">{feedback}</p> : null}
        </motion.form>
      </div>
    </section>
  );
}
