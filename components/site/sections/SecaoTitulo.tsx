import { Reveal } from "@/components/site/Reveal";

/**
 * Cabeçalho padrão de seção: kicker opcional (uppercase accent), título
 * display e subtítulo. Centralizado por padrão; alinhamento à esquerda
 * opcional. Mantém o ritmo tipográfico entre as faixas da landing.
 */
export function SecaoTitulo({
  kicker,
  titulo,
  texto,
  centrado = true,
}: {
  kicker?: string;
  titulo: string;
  texto?: string;
  centrado?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${centrado ? "mx-auto text-center" : ""}`}>
      {kicker ? (
        <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">{kicker}</p>
      ) : null}
      <h2 className="mt-3 font-display text-display-md text-paper">{titulo}</h2>
      {texto ? <p className={`mt-4 text-paper/70 ${centrado ? "mx-auto" : ""}`}>{texto}</p> : null}
    </Reveal>
  );
}
