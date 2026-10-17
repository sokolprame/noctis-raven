"use client";

import { useState } from "react";
import type { ContactRequest } from "@/lib/contact-db";

export default function AdminMessageInbox({
  initialRequests,
  locale,
}: {
  initialRequests: ContactRequest[];
  locale: "ru" | "en";
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [feedback, setFeedback] = useState("");
  const ru = locale === "ru";

  async function removeRequest(id: string) {
    if (!window.confirm(ru ? "Удалить это сообщение? Действие нельзя отменить." : "Delete this message? This cannot be undone.")) return;

    setFeedback("");
    try {
      const response = await fetch("/api/admin/contact-requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Delete failed");
      setRequests((current) => current.filter((item) => item.id !== id));
      setFeedback(ru ? "Сообщение удалено." : "Message deleted.");
    } catch {
      setFeedback(ru ? "Не удалось удалить сообщение. Попробуйте ещё раз." : "Could not delete the message. Please try again.");
    }
  }

  if (requests.length === 0) {
    return (
      <div className="space-y-3">
        {feedback ? <p className="text-xs text-[#ffb3c7]" aria-live="polite">{feedback}</p> : null}
        <p className="border border-white/10 bg-[#080808] px-4 py-6 text-sm text-white/55">{ru ? "Входящих сообщений пока нет." : "There are no messages yet."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedback ? <p className="text-xs text-[#ffb3c7]" aria-live="polite">{feedback}</p> : null}
      {requests.map((request) => (
        <article key={request.id} className="border border-white/12 bg-[#080808] p-4 sm:p-6">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-base font-semibold uppercase tracking-[-0.02em] text-white sm:text-lg">{request.name}</h2>
              <a href={`mailto:${request.email}`} className="mt-1 inline-block text-xs text-[#ff526f] underline underline-offset-4">{request.email}</a>
            </div>
            <time dateTime={request.createdAt} className="text-[9px] uppercase tracking-[0.18em] text-white/40">
              {new Intl.DateTimeFormat(ru ? "ru-RU" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(request.createdAt))}
            </time>
          </div>
          <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-white/70">{request.message}</p>
          <button type="button" onClick={() => void removeRequest(request.id)} className="mt-5 min-h-10 border border-white/15 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/55 transition hover:border-[#c8102e] hover:text-[#ff526f]">
            {ru ? "Удалить сообщение" : "Delete message"}
          </button>
        </article>
      ))}
    </div>
  );
}
