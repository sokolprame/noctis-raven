PostgreSQL + pgAdmin4 setup (короткая инструкция)

1) Установка и запуск PostgreSQL
- Установи PostgreSQL 15+ и pgAdmin4 на свою машину.
- Создай базу данных, например `noctis_raven`.

2) Подключение в pgAdmin4
- Создай подключение к локальному серверу, укажи хост `localhost`, порт `5432`, пользователя и пароль.
- В разделе "Query Tool" выполни SQL из `migrations/001_create_projects.sql`.

3) Переменные окружения
- Создай `.env.local` в корне проекта с:

  DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/noctis_raven
  ADMIN_PASSWORD=your_admin_password_here

4) Заполнение демо-данными
- Установи `ts-node` глобально или добавь в devDependencies.
- Запусти: `npm run seed` (он использует `DATABASE_URL`).

5) Просмотр в pgAdmin
- Открой таблицу `projects` и убедись, что строки добавились.

Дополнительно
- Если функция `gen_random_uuid()` отсутствует, включи расширение: `CREATE EXTENSION IF NOT EXISTS pgcrypto;`.
