"use client";

import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      window.location.href = "/admin";
    } else {
      setError("Неверный пароль. Попробуйте снова.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8f5f5]">
      <div className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16 sm:px-8">
        <div className="w-full rounded-[36px] border border-white/10 bg-[#0b0a0f]/95 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
          <h1 className="text-4xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5]">Вход в админку</h1>
          <p className="mt-4 text-base leading-7 text-[#b9b2bc]">
            Войдите, чтобы управлять каталогом проектов.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <label className="block text-sm uppercase tracking-[0.2em] text-[#8f8a91]">
              Пароль администратора
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-[#09090f]/90 px-4 py-4 text-sm text-[#f8f5f5] outline-none transition focus:border-[#ff1a4d] focus:ring-1 focus:ring-[#ff1a4d]/30"
                placeholder="Введите пароль"
              />
            </label>
            {error && <p className="text-sm text-[#ff6b8a]">{error}</p>}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#ff1a4d] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#ff345f]"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
