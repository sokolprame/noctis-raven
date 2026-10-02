export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-[11px] uppercase tracking-[0.28em] text-[#a1a1a1] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© 2026 NOCTIS RAVEN</p>
        <div className="flex flex-wrap items-center gap-4 text-[#d8d8d8]">
          <a href="https://t.me/noctisraven" target="_blank" rel="noreferrer" className="transition hover:text-[#ff1a4d]">
            Telegram
          </a>
          <a href="https://vk.com/noctisraven" target="_blank" rel="noreferrer" className="transition hover:text-[#ff1a4d]">
            VK
          </a>
          <a href="https://github.com/noctisraven" target="_blank" rel="noreferrer" className="transition hover:text-[#ff1a4d]">
            GitHub
          </a>
          <a href="https://instagram.com/noctisraven" target="_blank" rel="noreferrer" className="transition hover:text-[#ff1a4d]">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
