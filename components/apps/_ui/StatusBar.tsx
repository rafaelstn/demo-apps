/**
 * Barra de status simulada no topo de toda tela de app (hora + sinal/wifi/bateria).
 * Fica sob o notch do PhoneFrame, na cor do cabeçalho do app, para dar realismo e
 * evitar a colisão do conteúdo com a pílula do aparelho. Mesmo padrão visual do
 * HeroPhone da home.
 */
export function StatusBar({ color, tint = "white" }: { color: string; tint?: "white" | "ink" }) {
  const cor = tint === "white" ? "text-white" : "text-ink";
  return (
    <div
      className={`flex shrink-0 items-center justify-between px-5 pb-1 pt-2.5 text-[11px] font-medium ${cor}`}
      style={{ backgroundColor: color }}
    >
      <span className="tabular-nums tracking-tight">9:41</span>
      <span className="flex items-center gap-1.5" aria-hidden>
        {/* Sinal */}
        <svg viewBox="0 0 18 12" className="h-2.5 w-auto" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="0.5" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" opacity="0.5" />
        </svg>
        {/* Wi-Fi */}
        <svg
          viewBox="0 0 16 12"
          className="h-2.5 w-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M2 4.5a9 9 0 0 1 12 0" />
          <path d="M4.2 7a6 6 0 0 1 7.6 0" />
          <path d="M8 9.6h.01" strokeWidth="2" />
        </svg>
        {/* Bateria */}
        <span className="flex items-center gap-0.5 opacity-95">
          <span className="flex h-2.5 w-4 items-center rounded-[2px] border border-current p-[1px]">
            <span className="h-full w-3/4 rounded-[1px] bg-current" />
          </span>
          <span className="h-1 w-0.5 rounded-r-sm bg-current" />
        </span>
      </span>
    </div>
  );
}
