import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set. Create .env.local with DATABASE_URL.");
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function run() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;

      CREATE TABLE IF NOT EXISTS arts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'ART',
        summary TEXT NOT NULL,
        description TEXT NOT NULL,
        story TEXT NOT NULL,
        tools JSONB DEFAULT '[]'::jsonb,
        cover TEXT NOT NULL,
        gallery JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS web_projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        summary TEXT NOT NULL,
        brief TEXT NOT NULL,
        challenge TEXT NOT NULL,
        goals JSONB DEFAULT '[]'::jsonb,
        solution TEXT NOT NULL,
        process_research TEXT NOT NULL,
        process_structure TEXT NOT NULL,
        process_prototyping TEXT NOT NULL,
        process_ui TEXT NOT NULL,
        gallery_home TEXT NOT NULL,
        gallery_inner TEXT NOT NULL,
        gallery_responsive TEXT NOT NULL,
        gallery_ui TEXT NOT NULL,
        technologies JSONB DEFAULT '[]'::jsonb,
        features JSONB DEFAULT '[]'::jsonb,
        live_url TEXT NOT NULL,
        result TEXT NOT NULL,
        cover TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    await client.query(`
      INSERT INTO arts (slug, title, category, summary, description, story, tools, cover, gallery)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (slug) DO NOTHING
    `, [
      "raven-revenant",
      "Raven Revenant",
      "ART",
      "Кинематографичный портрет персонажа в тёмном неоновом стиле.",
      "Серия работ о герое, который живёт на стыке готики и киберпанка.",
      "Идея появилась из желания объединить три образа: старого рыцаря, городского бандита и символа мрака.",
      JSON.stringify(["Procreate", "Photoshop", "Wacom"]),
      "/portfolio/art/raven-revenant-cover.svg",
      JSON.stringify([
        "/portfolio/art/raven-revenant-sketch.svg",
        "/portfolio/art/raven-revenant-process.svg",
        "/portfolio/art/raven-revenant-final.svg",
      ])
    ]);

    await client.query(`
      INSERT INTO arts (slug, title, category, summary, description, story, tools, cover, gallery)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (slug) DO NOTHING
    `, [
      "blood-moon-ritual",
      "Blood Moon Ritual",
      "ART",
      "Ритуальный образ колдуньи в красно-черной палитре.",
      "Работа посвящена мистическому ритуалу, где кровь, луна и тени становятся единым визуальным языком.",
      "Первые наброски делались как попытка передать состояние не только образа, но и эмоции.",
      JSON.stringify(["Clip Studio Paint", "Illustrator", "Композиция"]),
      "/portfolio/art/blood-moon-ritual-cover.svg",
      JSON.stringify([
        "/portfolio/art/blood-moon-ritual-sketch.svg",
        "/portfolio/art/blood-moon-ritual-process.svg",
        "/portfolio/art/blood-moon-ritual-final.svg",
      ])
    ]);

    await client.query(`
      INSERT INTO web_projects (slug, title, type, summary, brief, challenge, goals, solution, process_research, process_structure, process_prototyping, process_ui, gallery_home, gallery_inner, gallery_responsive, gallery_ui, technologies, features, live_url, result, cover)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      ON CONFLICT (slug) DO NOTHING
    `, [
      "luna-protocol",
      "Luna Protocol",
      "Премиальный лендинг",
      "Роскошная цифровая платформа для бренда с фокусом на премиальном впечатлении.",
      "Бренд хотел получить сайт, который чувствовался бы как продукт премиум-класса.",
      "Нужно было соединить сильную визуальную эстетику с понятной навигацией.",
      JSON.stringify(["Сильное первое впечатление", "Показать ценность продукта"]),
      "Разработан визуальный язык с глубокими контрастами и крупной типографикой.",
      "Изучена аудитория и тональность бренда.",
      "Сформирована логика поэтапной подачи информации.",
      "Созданы вайрфреймы для главного экрана и формы обратной связи.",
      "На основе структуры разработан UI с акцентом на крупные кнопки.",
      "/portfolio/web/luna-protocol-home.svg",
      "/portfolio/web/luna-protocol-inner.svg",
      "/portfolio/web/luna-protocol-responsive.svg",
      "/portfolio/web/luna-protocol-ui.svg",
      JSON.stringify(["Next.js", "Tailwind CSS", "Framer Motion"]),
      JSON.stringify(["Анимации блоков", "Премиальная типографика"]),
      "https://example.com",
      "Проект получил визуально цельную подачу и повысил ощущение доверия к бренду.",
      "/portfolio/web/luna-protocol-cover.svg"
    ]);

    await client.query(`
      INSERT INTO web_projects (slug, title, type, summary, brief, challenge, goals, solution, process_research, process_structure, process_prototyping, process_ui, gallery_home, gallery_inner, gallery_responsive, gallery_ui, technologies, features, live_url, result, cover)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      ON CONFLICT (slug) DO NOTHING
    `, [
      "velvet-flagship",
      "Velvet Flagship",
      "E-commerce UI",
      "Дизайн мобильного и веб-опыта для премиального магазина.",
      "Потребовалось сделать интерфейс, который бы передавал ощущение дороговизны.",
      "Нужно было сократить путь к покупке, сохранив атмосферу бренда.",
      JSON.stringify(["Упростить покупку", "Сделать интерфейс премиальным"]),
      "Разработана система карточек товара и продуманная навигация по категориям.",
      "Собраны данные по поведению покупателей и визуальным ожиданиям премиального сегмента.",
      "Сформированы блоки каталога, карточки продукта и логика навигации.",
      "Созданы интерактивные прототипы для главной страницы.",
      "Разработан UI с акцентом на крупные изображения.",
      "/portfolio/web/velvet-flagship-home.svg",
      "/portfolio/web/velvet-flagship-inner.svg",
      "/portfolio/web/velvet-flagship-responsive.svg",
      "/portfolio/web/velvet-flagship-ui.svg",
      JSON.stringify(["Figma", "Framer", "React"]),
      JSON.stringify(["Каталог товаров", "Мобильная версия"]),
      "https://example.com",
      "Кейс помог объединить визуальную роскошь с понятным покупательским маршрутом.",
      "/portfolio/web/velvet-flagship-cover.svg"
    ]);

    console.log("Portfolio seed completed");
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
