"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { withLocale } from "@/lib/i18n";

export default function ContactSection({ locale }: { locale: "ru" | "en" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [feedback, setFeedback] = useState("");
  const [mailtoHref, setMailtoHref] = useState("");
  const ru = locale === "ru";
  const t = ru
    ? {
        name: "Имя",
        namePlaceholder: "Как к вам обращаться",
        email: "Эл. почта",
        topic: "Тип проекта",
        choose: "Выберите направление",
        topics: ["Веб-дизайн", "Разработка сайта", "Брендинг", "Иллюстрация / арт", "Другое"],
        message: "Сообщение",
        messagePlaceholder: "Коротко опишите задачу, сроки или идею",
        submit: "Отправить сообщение",
        sending: "Отправляю…",
        sent: "Сообщение отправлено. Я свяжусь с вами в ближайшее время.",
        mail: "Сервер пока не принимает заявки. Напишите напрямую:",
        mailAction: "открыть письмо",
        privacy: "Политика конфиденциальности",
        invalid: "Проверьте заполнение полей.",
      }
    : {
        name: "Name",
        namePlaceholder: "How should I address you?",
        email: "Email address",
        topic: "Project type",
        choose: "Choose a service",
        topics: ["Web design", "Website development", "Branding", "Illustration / art", "Other"],
        message: "Message",
        messagePlaceholder: "Briefly describe the brief, timing, or first idea",
        submit: "Send message",
        sending: "Sending…",
        sent: "Your message has been sent. I’ll get back to you soon.",
        mail: "The form is temporarily unavailable. Send your message directly:",
        mailAction: "open email",
        privacy: "Privacy notice",
        invalid: "Please check the fields and try again.",
      };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");
    setMailtoHref("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");
    const website = String(data.get("website") ?? "");
    const fullMessage = [subject, message].filter(Boolean).join("\n\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: fullMessage, website }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          setStatus("idle");
          setFeedback(t.invalid);
          return;
        }
        throw new Error("Contact API unavailable");
      }
      form.reset();
      setMailtoHref("");
      setFeedback(t.sent);
    } catch {
      const mailSubject = encodeURIComponent(`${ru ? "Сообщение от" : "Message from"} ${name}${subject ? ` · ${subject}` : ""}`);
      const mailBody = encodeURIComponent(`${t.name}: ${name}\n${t.email}: ${email}\n\n${fullMessage}`);
      setMailtoHref(`mailto:raven4noctis@gmail.com?subject=${mailSubject}&body=${mailBody}`);
      setFeedback(t.mail);
      setStatus("idle");
      return;
    }
    setStatus("success");
  }

  const fieldClass = "min-h-12 w-full border border-white/10 bg-[#090909] px-3.5 py-3 text-[13px] text-white outline-none transition placeholder:text-white/30 focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]/25 sm:px-4 sm:py-3.5 sm:text-sm";
  const labelClass = "grid gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/60 sm:gap-2.5 sm:text-[10px] sm:tracking-[0.2em]";

  return (
    <section id="contact-form" className="relative">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.04 }}
        className="grid gap-2.5 sm:gap-3"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          <label className={labelClass}>
            <span>{t.name}</span>
            <input name="name" type="text" placeholder={t.namePlaceholder} autoComplete="name" maxLength={100} required className={fieldClass} />
          </label>
          <label className={labelClass}>
            <span>{t.email}</span>
            <input name="email" type="email" placeholder="name@example.com" autoComplete="email" maxLength={254} required className={fieldClass} />
          </label>
        </div>
        <label className={labelClass}>
          <span>{t.topic}</span>
          <select name="subject" defaultValue="" required className={`${fieldClass} appearance-none`}>
            <option value="" disabled>{t.choose}</option>
            {t.topics.map((topic) => <option key={topic} value={topic} className="bg-[#090909]">{topic}</option>)}
          </select>
        </label>
        <label className={labelClass}>
          <span>{t.message}</span>
          <textarea name="message" rows={4} placeholder={t.messagePlaceholder} maxLength={5000} required className={`${fieldClass} min-h-32 resize-y`} />
        </label>
        <button type="submit" disabled={status === "loading"} className="mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#c8102e] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#ed1739] disabled:cursor-wait disabled:opacity-60 sm:py-4 sm:text-[11px]">
          {status === "loading" ? t.sending : t.submit}<ArrowRight className="h-4 w-4" />
        </button>
        {feedback ? (
          <p className="text-xs leading-6 text-[#d8a0ad]" aria-live="polite">
            {mailtoHref ? <>{feedback} <a className="underline underline-offset-4 hover:text-white" href={mailtoHref}>{t.mailAction}</a></> : feedback}
          </p>
        ) : null}
        <p className="text-[10px] leading-5 text-white/35">
          {ru ? "Данные из формы используются, чтобы ответить на ваш запрос." : "Form details are used to reply to your request."}{" "}
          <Link className="underline underline-offset-4 transition hover:text-white/70" href={withLocale("/privacy", locale)}>{t.privacy}</Link>
        </p>
      </motion.form>
    </section>
  );
}
