export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-9 w-9 shrink-0">
        <path d="M20 2 37 11.5v17L20 38 3 28.5v-17L20 2Z" fill="#c8102e" />
        <path d="m12 27 8-16 8 16-8-5-8 5Z" fill="#f7f4f1" />
        <path d="m16.2 24.5 3.8-7.7 3.8 7.7-3.8-2.4-3.8 2.4Z" fill="#111" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[13px] font-black uppercase tracking-[0.22em]">NOCTIS</span>
        {!compact && <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.36em] text-white/45">RAVEN · DIGITAL STUDIO</span>}
      </span>
    </span>
  );
}
