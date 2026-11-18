import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { resolveLocale, withLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How NOCTIS RAVEN handles information sent through the contact form.",
};

export default async function PrivacyPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
  const ru = locale === "ru";

  return (
    <main id="main-content" lang={locale} className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <article className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16 lg:px-10">
        <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#ff526f]">NOCTIS RAVEN / {ru ? "КОНТАКТНЫЕ ДАННЫЕ" : "CONTACT DATA"}</p>
        <h1 className={`mt-5 font-black uppercase leading-[0.9] tracking-[-0.07em] ${ru ? "text-[clamp(1.55rem,7.4vw,3.75rem)]" : "text-[clamp(2rem,8vw,3.75rem)]"}`}>{ru ? "КОНФИДЕНЦИАЛЬНОСТЬ" : "PRIVACY NOTICE"}</h1>
        <div className="mt-8 space-y-7 border-t border-white/10 pt-6 text-sm leading-7 text-white/65 sm:mt-10 sm:space-y-8 sm:pt-8 sm:text-base sm:leading-8">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">{ru ? "Что передаёт форма" : "Information submitted"}</h2>
            <p className="mt-3">{ru ? "Форма запрашивает имя, адрес электронной почты, тип проекта и сообщение. Эти сведения нужны только для ответа на ваш запрос." : "The contact form asks for your name, email address, project type, and message. These details are used to reply to your inquiry."}</p>
          </section>
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">{ru ? "Как используются сообщения" : "How messages are handled"}</h2>
            <p className="mt-3">{ru ? "Если форма доступна, сообщение сохраняется в базе данных сайта и доступно владельцу сайта через защищённую административную панель. Сообщения хранятся до ручного удаления; вы можете попросить удалить своё сообщение по электронной почте. Если отправка временно недоступна, сайт предложит открыть письмо на raven4noctis@gmail.com; оно будет отправлено только после вашего подтверждения в почтовом приложении." : "When the form is available, a message is saved in the site database and can be read by the site owner in the protected admin area. Messages remain stored until the site owner deletes them; you can request deletion by email. If submission is temporarily unavailable, the site offers to open an email draft to raven4noctis@gmail.com; it is sent only if you choose to send it in your email app."}</p>
          </section>
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">{ru ? "Удаление сообщения" : "Deleting a message"}</h2>
            <p className="mt-3">{ru ? "Попросить удалить отправленное сообщение можно по адресу" : "To request deletion of a submitted message, email"}{" "}<a href="mailto:raven4noctis@gmail.com" className="text-[#ff526f] underline underline-offset-4">raven4noctis@gmail.com</a>.</p>
          </section>
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">{ru ? "Технические данные" : "Technical data"}</h2>
            <p className="mt-3">{ru ? "Сайт не подключает рекламную аналитику. Для входа в административную панель используется защищённая cookie-сессия." : "The site does not use advertising analytics. A secure cookie session is used for access to the admin area."}</p>
          </section>
        </div>
        <Link href={withLocale("/contact", locale)} className="mt-9 inline-flex min-h-11 items-center border border-white/20 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.22em] transition hover:border-[#c8102e] hover:text-[#ff526f] sm:mt-12">
          {ru ? "НАЗАД К КОНТАКТАМ" : "BACK TO CONTACT"}
        </Link>
      </article>
      <Footer />
    </main>
  );
}
