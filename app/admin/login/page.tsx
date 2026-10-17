"use client";

import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        window.location.href = "/admin";
        return;
      }

      setError(response.status === 401
        ? "Неверный пароль. Попробуйте снова."
        : response.status === 503
          ? "Вход не настроен. Укажите ADMIN_PASSWORD и ADMIN_SESSION_SECRET в переменных окружения сайта."
          : "Сервис входа временно недоступен. Попробуйте позже.");
    } catch {
      setError("Не удалось связаться с сервером. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8f5f5]">
        <div className="mx-auto flex min-h-screen max-w-xl items-center px-5 py-10 sm:px-8 sm:py-16">
        <div className="w-full border border-white/10 bg-[#0b0a0f]/95 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-10">
          <h1 className="text-3xl font-semibold uppercase tracking-[0.12em] text-[#f8f5f5] sm:text-4xl sm:tracking-[0.24em]">Вход в админку</h1>
          <p className="mt-4 text-base leading-7 text-[#b9b2bc]">
            Войдите, чтобы читать заявки, отправленные через контактную форму.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
            <label className="block text-sm uppercase tracking-[0.2em] text-[#8f8a91]">
              Пароль администратора
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                maxLength={512}
                className="mt-3 min-h-12 w-full border border-white/10 bg-[#09090f]/90 px-4 py-3 text-sm text-[#f8f5f5] outline-none transition focus:border-[#ff1a4d] focus:ring-1 focus:ring-[#ff1a4d]/30"
                placeholder="Введите пароль"
              />
            </label>
            {error && <p className="text-sm leading-6 text-[#ff6b8a]" aria-live="polite">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center bg-[#c8102e] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#ff1a4d] disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Проверяю…" : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
