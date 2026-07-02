/**
 * Barra de navegação inferior reutilizável, fixa no rodapé da tela do app (dentro
 * do PhoneFrame). Recebe os itens, qual está ativo e a função de navegar. O item
 * ativo fica na cor accent; os demais em cinza. Cada item leva a uma tela real via
 * onNavigate, ou dispara uma ação (ex.: abrir um aviso), nunca é botão morto.
 */
import { Icone, type IconeId } from "./ui";

export type ItemNav = {
  id: string;
  label: string;
  icone: IconeId;
  onSelect: () => void;
};

export function BottomNav({
  itens,
  atual,
  accent,
}: {
  itens: ItemNav[];
  atual: string;
  accent: string;
}) {
  return (
    <nav
      className="shrink-0 border-t border-black/[0.07] bg-white/95 px-2 pb-2 pt-1.5 backdrop-blur"
      aria-label="Navegação principal"
    >
      <ul className="flex items-stretch justify-around">
        {itens.map((it) => {
          const ativo = it.id === atual;
          return (
            <li key={it.id} className="flex-1">
              <button
                type="button"
                onClick={it.onSelect}
                aria-current={ativo ? "page" : undefined}
                className="flex w-full flex-col items-center gap-0.5 rounded-xl py-1 transition active:scale-95"
                style={{ color: ativo ? accent : "#8A8A92" }}
              >
                <Icone id={it.icone} className="h-[22px] w-[22px]" />
                <span className="text-[10px] font-medium leading-none tracking-tight">{it.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
