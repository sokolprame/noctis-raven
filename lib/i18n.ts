export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export function resolveLocale(value?: string | string[] | null): Locale {
  if (typeof value === "string") {
    return value === "en" ? "en" : "ru";
  }

  return "ru";
}

export function withLocale(pathname: string, locale: Locale) {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const separator = cleanPath.includes("?") ? "&" : "?";
  return `${cleanPath}${separator}lang=${locale}`;
}

export const translations = {
  ru: {
    nav: {
      work: "Работы",
      about: "Обо мне",
      contact: "Контакты",
    },
    status: "Доступен для работы",
    badge: "Художник / Дизайнер / Веб-разработчик",
    hero: {
      title: ["Я СОЗДАЮ", "ЦИФРОВЫЕ МИРЫ."],
      subtitle:
        "Создаю визуальные системы, цифровое искусство и веб-проекты на стыке дизайна, технологий и атмосферы.",
      primary: "Смотреть работы",
      secondary: "Обо мне",
    },
    sections: {
      work: "01 / ИЗБРАННЫЕ ПРОЕКТЫ",
      about: "02 / ОБО МНЕ",
      expertise: "03 / ЭКСПЕРТИЗА",
      contact: "04 / КОНТАКТЫ",
      philosophy: "ФИЛОСОФИЯ",
    },
    about: {
      title: ["Я ДИЗАЙНИРУЮ.", "Я РИСУЮ.", "Я СТРОЮ."],
      lead:
        "Я работаю на стыке цифрового искусства и продуктового дизайна. Мои проекты создаются через атмосферу, детали и ясную идею.",
      body:
        "От иллюстраций и визуальных систем до интерактивных веб-сайтов и премиальных лендингов — я создаю работу, которая ощущается личной, точной и живой.",
    },
    contact: {
      title: ["Есть идея?", "Давайте создадим это."],
      text: "Открыт к freelance-проектам, креативным коллаборациям и интересным идеям.",
      cta: "Начать проект",
      email: "Почта",
      connect: "Связаться",
    },
    footer: {
      built: "Дизайн и разработка NOCTIS",
    },
  },
  en: {
    nav: {
      work: "Work",
      about: "About",
      contact: "Contact",
    },
    status: "Available for work",
    badge: "Artist / Designer / Web Developer",
    hero: {
      title: ["I CREATE", "DIGITAL WORLDS."],
      subtitle:
        "I design visual systems, digital art, and web experiences at the intersection of design, technology, and atmosphere.",
      primary: "View projects",
      secondary: "About me",
    },
    sections: {
      work: "01 / SELECTED WORK",
      about: "02 / ABOUT",
      expertise: "03 / EXPERTISE",
      contact: "04 / CONTACT",
      philosophy: "PHILOSOPHY",
    },
    about: {
      title: ["I DESIGN.", "I DRAW.", "I BUILD."],
      lead:
        "I work at the boundary between digital art and product design. My projects are shaped by atmosphere, detail, and clear intent.",
      body:
        "From illustrations and visual systems to interactive websites and premium landing pages, I build work that feels personal, precise, and alive.",
    },
    contact: {
      title: ["Have an idea?", "Let’s build it."],
      text: "Open for freelance projects, creative collaborations and meaningful ideas.",
      cta: "Start a project",
      email: "Email",
      connect: "Connect",
    },
    footer: {
      built: "Designed & built by NOCTIS",
    },
  },
} as const;
