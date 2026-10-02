export type ArtWork = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  story: string;
  tools: string[];
  cover: string;
  gallery: string[];
};

export type WebProject = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  brief: string;
  challenge: string;
  goals: string[];
  solution: string;
  process: {
    research: string;
    structure: string;
    prototyping: string;
    ui: string;
  };
  gallery: {
    home: string;
    inner: string;
    responsive: string;
    ui: string;
  };
  development: {
    technologies: string[];
    features: string[];
    liveUrl: string;
  };
  result: string;
  cover: string;
};

export const artWorks: ArtWork[] = [
  {
    slug: "raven-revenant",
    title: "Raven Revenant",
    category: "ART",
    summary: "Кинематографичный портрет персонажа в тёмном неоновом стиле.",
    description:
      "Серия работ о герое, который живёт на стыке готики и киберпанка. Эта иллюстрация раскрывает характер через оружие, броню и напряжённый взгляд.",
    story:
      "Идея появилась из желания объединить три образа: старого рыцаря, городского бандита и символа мрака. В процессе были сформированы контрастные формы и хрупкие световые акценты.",
    tools: ["Procreate", "Photoshop", "Wacom", "Световые акценты"],
    cover: "/portfolio/art/raven-revenant-cover.svg",
    gallery: [
      "/portfolio/art/raven-revenant-sketch.svg",
      "/portfolio/art/raven-revenant-process.svg",
      "/portfolio/art/raven-revenant-final.svg",
    ],
  },
  {
    slug: "blood-moon-ritual",
    title: "Blood Moon Ritual",
    category: "ART",
    summary: "Ритуальный образ колдуньи в красно-черной палитре.",
    description:
      "Работа посвящена мистическому ритуалу, где кровь, луна и тени становятся единым визуальным языком.",
    story:
      "Первые наброски делались как попытка передать состояние не только образа, но и эмоции — ритуального страха и трепета.",
    tools: ["Clip Studio Paint", "Illustrator", "Кисти", "Композиция"],
    cover: "/portfolio/art/blood-moon-ritual-cover.svg",
    gallery: [
      "/portfolio/art/blood-moon-ritual-sketch.svg",
      "/portfolio/art/blood-moon-ritual-process.svg",
      "/portfolio/art/blood-moon-ritual-final.svg",
    ],
  },
];

export const webProjects: WebProject[] = [
  {
    slug: "luna-protocol",
    title: "Luna Protocol",
    type: "Премиальный лендинг",
    summary: "Роскошная цифровая платформа для бренда с фокусом на премиальном впечатлении.",
    brief: "Бренд хотел получить сайт, который чувствовался бы как продукт премиум-класса и одновременно оставался понятным для новых пользователей.",
    challenge: "Нужно было соединить сильную визуальную эстетику с понятной навигацией и быстрым акцентом на ключевых действиях.",
    goals: ["Сделать сильное первое впечатление", "Показать ценность продукта", "Поднять конверсию в заявке"],
    solution:
      "Разработан визуальный язык с глубокими контрастами, крупной типографикой, аккуратной структурой и тёмной палитрой, усиливающей премиальный характер бренда.",
    process: {
      research: "Изучена аудитория, тональность бренда, ключевые сценарии поведения и референсы конкурентов.",
      structure: "Сформирована логика поэтапной подачи информации: бренд → ценность → кейсы → контакт.",
      prototyping: "Созданы вайрфреймы для главного экрана, блоков с услугами и формы обратной связи.",
      ui: "На основе структуры разработан UI с акцентом на крупные кнопки, анимацию и точечные микровзаимодействия.",
    },
    gallery: {
      home: "/portfolio/web/luna-protocol-home.svg",
      inner: "/portfolio/web/luna-protocol-inner.svg",
      responsive: "/portfolio/web/luna-protocol-responsive.svg",
      ui: "/portfolio/web/luna-protocol-ui.svg",
    },
    development: {
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      features: ["Анимации блоков", "Премиальная типографика", "Помехоустойчивый адаптив"],
      liveUrl: "https://example.com",
    },
    result: "Проект получил визуально цельную подачу и повысил ощущение доверия к бренду уже на первом экране.",
    cover: "/portfolio/web/luna-protocol-cover.svg",
  },
  {
    slug: "velvet-flagship",
    title: "Velvet Flagship",
    type: "E-commerce UI",
    summary: "Дизайн мобильного и веб-опыта для премиального магазина.",
    brief: "Потребовалось сделать интерфейс, который бы передавал ощущение дороговизны и при этом оставался удобным для покупателя.",
    challenge: "Нужно было сократить путь к покупке, сохранив атмосферу бренда и подчёркивая детали товара.",
    goals: ["Упростить покупку", "Показать детализацию товаров", "Сделать интерфейс премиальным"],
    solution:
      "Разработана система карточек товара, крупные изображения и продуманная навигация по категориям с акцентом на эстетическую глубину.",
    process: {
      research: "Собраны данные по поведению покупателей и визуальным ожиданиям премиального сегмента.",
      structure: "Сформированы блоки каталога, карточки продукта и логика персонализированной навигации.",
      prototyping: "Созданы интерактивные прототипы для главной страницы и страницы карточки товара.",
      ui: "Разработан UI с акцентом на крупные изображения, модули рекомендаций и точечные переходы.",
    },
    gallery: {
      home: "/portfolio/web/velvet-flagship-home.svg",
      inner: "/portfolio/web/velvet-flagship-inner.svg",
      responsive: "/portfolio/web/velvet-flagship-responsive.svg",
      ui: "/portfolio/web/velvet-flagship-ui.svg",
    },
    development: {
      technologies: ["Figma", "Framer", "React"],
      features: ["Каталог товаров", "Предпросмотр вариаций", "Мобильная версия"],
      liveUrl: "https://example.com",
    },
    result: "Кейс помог объединить визуальную роскошь с понятным покупательским маршрутом.",
    cover: "/portfolio/web/velvet-flagship-cover.svg",
  },
];

export function getArtWorkBySlug(slug: string) {
  return artWorks.find((item) => item.slug === slug);
}

export function getWebProjectBySlug(slug: string) {
  return webProjects.find((item) => item.slug === slug);
}
