export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "Telegram" | "Instagram" | "TikTok" | "VK";
};

export type PortfolioItem = {
  id?: string;
  title: string;
  category: string;
  description: string;
  accent: string;
  tags: string[];
};

export type ServiceItem = {
  title: string;
  description: string;
  features: string[];
  icon: "Web" | "Illustration" | "Ui" | "Brand";
};

export type FeedItem = {
  title: string;
  label: string;
  date: string;
  excerpt: string;
};

export const navItems: NavItem[] = [
  { label: "Портфолио", href: "/portfolio" },
  { label: "Услуги", href: "#services" },
  { label: "Обо мне", href: "#about" },
  { label: "Лента", href: "#feed" },
  { label: "Контакт", href: "#contact" },
];

export const socials: SocialLink[] = [
  { label: "Telegram", href: "https://t.me/noctisraven", icon: "Telegram" },
  { label: "Instagram", href: "https://instagram.com/noctisraven", icon: "Instagram" },
  { label: "TikTok", href: "https://tiktok.com/@noctisraven", icon: "TikTok" },
  { label: "VK", href: "https://vk.com/noctisraven", icon: "VK" },
];

export const portfolioCategories = ["Все", "Персонажи", "Иллюстрации", "Веб-разработка", "UI/UX"];

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Raven Revenant",
    category: "Персонажи",
    description: "Тёмный фэнтезийный воин с кровавыми акцентами и кибернетической бронёй.",
    accent: "#ff1a4d",
    tags: ["аниме", "персонаж", "оружие"],
  },
  {
    title: "Crimson Skyline",
    category: "Иллюстрации",
    description: "Городской пейзаж с готической энергией, неоновым туманом и металлическими отблесками.",
    accent: "#b3002d",
    tags: ["окружение", "настроение", "освещение"],
  },
  {
    title: "Nexus Studio",
    category: "Веб-разработка",
    description: "Премиальный лендинг для элитной креативной студии.",
    accent: "#ff1a4d",
    tags: ["Next.js", "Tailwind", "motion"],
  },
  {
    title: "Phantom Interface",
    category: "UI/UX",
    description: "Элегантная тёмная UI-система с плавными взаимодействиями и футуристичным визуалом.",
    accent: "#b3002d",
    tags: ["панель", "опыт", "дизайн"],
  },
  {
    title: "Blood Moon Ritual",
    category: "Персонажи",
    description: "Портрет колдуньи, смешивающий готическую моду и киберэлементы.",
    accent: "#ff1a4d",
    tags: ["портрет", "мода", "фэнтези"],
  },
  {
    title: "Obsidian Grid",
    category: "Веб-разработка",
    description: "Модульный интерфейс для премиальных цифровых продуктов.",
    accent: "#b3002d",
    tags: ["макет", "масштабирование", "производительность"],
  },
];

export const services: ServiceItem[] = [
  {
    title: "Веб-разработка",
    description: "Next.js, Tailwind и full-stack системы для смелых цифровых брендов.",
    features: ["Премиальные лендинги", "Архитектура для CMS", "Производительность в приоритете"],
    icon: "Web",
  },
  {
    title: "Персонажный дизайн и иллюстрация",
    description: "Тёмное фэнтези, портреты в стиле аниме и кинематографичные иллюстрации.",
    features: ["Концепт-арт", "Детализированные рендеры", "Брендовый сторителлинг"],
    icon: "Illustration",
  },
  {
    title: "Дизайн UI/UX",
    description: "Роскошные интерфейсы с чётким краем и погружающей анимацией.",
    features: ["Пользовательские потоки", "Дизайн-системы", "Адаптивные макеты"],
    icon: "Ui",
  },
  {
    title: "Фирменный стиль",
    description: "Визуальные системы, логотипы и цифровые идентичности для элитных проектов.",
    features: ["Авторская эстетика", "Цифровой брендинг", "Студийные нарративы"],
    icon: "Brand",
  },
];

export const skills = [
  "Next.js",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Концепт-арт",
  "Бренд-дизайн",
  "UI/UX стратегия",
  "Иллюстрация",
  "Цифровой сторителлинг",
];

export const feedItems: FeedItem[] = [
  {
    title: "Запуск UI Luna Protocol",
    label: "Обновление дизайна",
    date: "июль 2026",
    excerpt: "Выпущен новый веб-опыт для бутикового кибер-модного лейбла с насыщенной анимацией.",
  },
  {
    title: "Портрет Raven Revenant",
    label: "Арткат",
    date: "июнь 2026",
    excerpt: "Завершено премиальное изображение персонажа, сочетающее готическую моду и неоновое сияние.",
  },
  {
    title: "Фирменный стиль NOCTIS",
    label: "Студия",
    date: "май 2026",
    excerpt: "Отточена визуальная система для роскошной креативной студии с подвешенным красным светом и матовой текстурой.",
  },
];
