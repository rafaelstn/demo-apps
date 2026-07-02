/**
 * Layout de uma tela de app dentro do PhoneFrame. Estrutura em coluna:
 *   - StatusBar (hora + ícones) fixa no topo, na cor do cabeçalho;
 *   - corpo com scroll vertical próprio (o conteúdo rola entre topo e rodapé);
 *   - footer opcional (CTA principal), colado acima da barra;
 *   - BottomNav opcional (barra de navegação inferior).
 * Assim a barra de status nunca some no scroll e a bottom nav fica sempre no rodapé
 * do aparelho, sem depender de position fixed/viewport.
 */
import { StatusBar } from "./StatusBar";
import { BottomNav, type ItemNav } from "./BottomNav";

export function AppScreen({
  statusColor,
  accent,
  nav,
  navAtual,
  footer,
  children,
  bodyClassName = "",
}: {
  statusColor: string;
  accent: string;
  nav?: ItemNav[];
  navAtual?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  bodyClassName?: string;
}) {
  return (
    <div className="flex h-full flex-col bg-paper">
      <StatusBar color={statusColor} />
      <div className={`flex-1 overflow-y-auto overscroll-contain ${bodyClassName}`}>{children}</div>
      {footer ? (
        <div className="shrink-0 border-t border-black/[0.05] bg-white/95 px-4 py-3 backdrop-blur">{footer}</div>
      ) : null}
      {nav && navAtual ? <BottomNav itens={nav} atual={navAtual} accent={accent} /> : null}
    </div>
  );
}
