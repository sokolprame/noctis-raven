import type { Locale } from "./i18n";

export type ProjectCopy = {
  summary: string;
  description: string;
  highlightsTitle: string;
  highlights: string[];
};

export type ProjectApproach = {
  title: string;
  description: string;
};

export type ProjectDesign = {
  colors: { label: string; value: string }[];
  typography: string;
  interface: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  type: Record<Locale, string>;
  role: Record<Locale, string>;
  services: Record<Locale, string[]>;
  category: string;
  collection: string;
  liveUrl: string;
  previewUrl: string;
  previewFit: "cover" | "contain";
  gallery: string[];
  galleryFit: Array<"cover" | "contain">;
  copy: Record<Locale, ProjectCopy>;
  problem: Record<Locale, string>;
  approach: Record<Locale, ProjectApproach[]>;
  design: Record<Locale, ProjectDesign>;
};

export const projectFilters = ["All", "Commerce", "Memorial"] as const;

export const portfolioProjects: PortfolioItem[] = [
  {
    slug: "2-cultures",
    title: "2 КУЛЬТУРЫ",
    client: "ООО «2 Культуры»",
    type: { ru: "Сайт-каталог", en: "Product catalogue website" },
    role: { ru: "Разработка сайта", en: "Website development" },
    services: {
      ru: ["Каталог продукции", "Навигация по категориям", "Запрос оптового прайс-листа"],
      en: ["Product catalogue", "Category navigation", "Wholesale price-list request"],
    },
    category: "Web",
    collection: "Commerce",
    liveUrl: "https://sokolprame.pythonanywhere.com/",
    previewUrl: "https://www.2cultures.ru/images/slide1.jpg",
    previewFit: "cover",
    gallery: [
      "https://www.2cultures.ru/images/slide1.jpg",
      "https://sokolprame.pythonanywhere.com/static/image/logo.png",
    ],
    galleryFit: ["cover", "contain"],
    copy: {
      ru: {
        summary: "Сайт производителя шампуров, мангалов и товаров для пикника.",
        description:
          "Сайт ООО «2 Культуры» представляет продукцию компании и помогает оптовым покупателям запросить прайс-лист. В основе — каталог, категории товаров и информация для связи с производителем.",
        highlightsTitle: "Разделы сайта",
        highlights: [
          "Каталог и категории товаров для пикника",
          "Форма запроса оптового прайс-листа",
          "Контактная информация и реквизиты компании",
        ],
      },
      en: {
        summary: "A website for a manufacturer of skewers, grills, and picnic goods.",
        description:
          "The website presents ООО «2 Культуры» and its product range, while helping wholesale buyers request a price list. Its content includes a product catalogue, product categories, and company contact information.",
        highlightsTitle: "Website sections",
        highlights: [
          "Catalogue and picnic-product categories",
          "Wholesale price-list request form",
          "Company contacts and legal details",
        ],
      },
    },
    problem: {
      ru: "Оптовому покупателю важно быстро сориентироваться в ассортименте производителя и понять, как запросить условия поставки.",
      en: "Wholesale buyers need to navigate the manufacturer's range quickly and find a clear way to request supply terms.",
    },
    approach: {
      ru: [
        { title: "Структура каталога", description: "Товары сгруппированы по категориям, которые вынесены в основную навигацию." },
        { title: "Поиск и навигация", description: "Поиск по каталогу и переходы по категориям дают несколько прямых путей к нужной продукции." },
        { title: "Контактный сценарий", description: "Форма запроса оптового прайс-листа дополнена контактами и реквизитами компании." },
        { title: "Визуальная подача", description: "Фотография продукции задаёт контекст, а контрастный заголовок сразу объясняет предложение." },
      ],
      en: [
        { title: "Catalogue structure", description: "Products are grouped into categories and surfaced in the primary navigation." },
        { title: "Search and navigation", description: "Catalogue search and category links provide direct paths to products." },
        { title: "Contact journey", description: "A wholesale price-list form is supported by company contact details and legal information." },
        { title: "Visual presentation", description: "Product photography sets the context while a high-contrast headline states the offer." },
      ],
    },
    design: {
      ru: {
        colors: [
          { label: "Графит", value: "#101010" },
          { label: "Белый", value: "#F5F5F5" },
          { label: "Тёплый акцент", value: "#9A633D" },
        ],
        typography: "Крупный плотный заголовок на первом экране; навигация и подписи остаются компактными и функциональными.",
        interface: "Категорийное меню, поиск, карточки продукции и форма запроса прайс-листа.",
      },
      en: {
        colors: [
          { label: "Graphite", value: "#101010" },
          { label: "White", value: "#F5F5F5" },
          { label: "Warm accent", value: "#9A633D" },
        ],
        typography: "A bold, oversized hero headline is balanced by compact, functional navigation and labels.",
        interface: "Category navigation, search, product cards, and a price-list request form.",
      },
    },
  },
  {
    slug: "svetlaya-pamyat-antonovskiy",
    title: "СВЕТЛАЯ ПАМЯТЬ",
    client: "Антоновский Георгий Иванович",
    type: { ru: "Страница памяти", en: "Memorial website" },
    role: { ru: "Разработка сайта", en: "Website development" },
    services: {
      ru: ["Биографическая история", "Фотогалерея", "Памятный фильм"],
      en: ["Personal story", "Photo gallery", "Memorial film"],
    },
    category: "Web",
    collection: "Memorial",
    liveUrl: "https://stalwart-gaufre-e11e94.netlify.app/",
    previewUrl: "https://stalwart-gaufre-e11e94.netlify.app/image/photo.png",
    previewFit: "cover",
    gallery: [
      "https://stalwart-gaufre-e11e94.netlify.app/image/photo.png",
      "https://stalwart-gaufre-e11e94.netlify.app/image/photo2.jpg",
      "https://stalwart-gaufre-e11e94.netlify.app/image/photo5.jpg",
    ],
    galleryFit: ["cover", "cover", "cover"],
    copy: {
      ru: {
        summary: "Персональная страница памяти Георгия Ивановича Антоновского.",
        description:
          "Сайт бережно собирает биографию и историю Георгия, фотографии и памятный фильм в одном месте.",
        highlightsTitle: "Содержание страницы",
        highlights: [
          "Биография и памятная история",
          "Фотогалерея",
          "Раздел с памятным фильмом",
        ],
      },
      en: {
        summary: "A personal memorial page for Georgy Ivanovich Antonovsky.",
        description:
          "The website brings together Georgy's biography and story, photographs, and a memorial film in one place.",
        highlightsTitle: "Page content",
        highlights: [
          "Biography and personal story",
          "Photo gallery",
          "Memorial film section",
        ],
      },
    },
    problem: {
      ru: "Личную историю, фотографии и памятное видео нужно было собрать в одном спокойном пространстве, посвящённом памяти Георгия.",
      en: "The personal story, photographs, and memorial video needed a single, quiet place dedicated to Georgy's memory.",
    },
    approach: {
      ru: [
        { title: "Первый экран", description: "Портрет, имя и даты сразу задают личный контекст страницы." },
        { title: "История", description: "Отдельный текстовый раздел сохраняет биографический рассказ и воспоминания." },
        { title: "Фотографии", description: "Галерея собирает визуальные воспоминания в одном месте." },
        { title: "Памятный фильм", description: "Видео вынесено в отдельный раздел и дополняет историю фотографиями и движущимся образом." },
      ],
      en: [
        { title: "Opening view", description: "The portrait, name, and dates establish the personal context immediately." },
        { title: "Story", description: "A dedicated text section preserves the biographical account and memories." },
        { title: "Photographs", description: "The gallery brings visual memories together in one place." },
        { title: "Memorial film", description: "A separate video section complements the written story and photographs." },
      ],
    },
    design: {
      ru: {
        colors: [
          { label: "Ночной фон", value: "#09090B" },
          { label: "Тёплый оттенок", value: "#796451" },
          { label: "Светлый текст", value: "#F1EEE9" },
        ],
        typography: "Имя и даты образуют главный акцент; заголовки разделов помогают спокойно читать страницу по частям.",
        interface: "Обложка с портретом, биографический блок, галерея и отдельный видеоплеер.",
      },
      en: {
        colors: [
          { label: "Night background", value: "#09090B" },
          { label: "Warm tone", value: "#796451" },
          { label: "Soft light text", value: "#F1EEE9" },
        ],
        typography: "The name and dates form the primary focal point; section headings keep the story easy to follow.",
        interface: "A portrait-led opening, biography section, photo gallery, and dedicated video player.",
      },
    },
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
