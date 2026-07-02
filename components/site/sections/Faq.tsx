"use client";
import { useId, useState } from "react";
import { SecaoTitulo } from "@/components/site/sections/SecaoTitulo";

/**
 * FAQ em acordeão acessível. Cada item é um <button> semântico com
 * aria-expanded/aria-controls; a resposta abre/fecha por estado. Um item por
 * vez aberto. Sem window.* nem dialog nativo. Respeita reduced motion via a
 * regra global de transição.
 */

const PERGUNTAS = [
  {
    q: "Quanto custa?",
    a: "A partir de R$ 5.000. O valor final depende do que o app precisa fazer. Você recebe um orçamento antes de começar.",
  },
  {
    q: "Em quanto tempo fica pronto?",
    a: "Depende do escopo do app. Combinamos o prazo na proposta, antes de iniciar.",
  },
  {
    q: "O app é meu?",
    a: "Sim. O código-fonte é entregue a você após a quitação. O app é do seu negócio.",
  },
  {
    q: "Vocês publicam na loja?",
    a: "A publicação na Google Play está inclusa. A App Store da Apple é à parte, ou você recebe o arquivo APK.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Não. A gente cuida de tudo, do desenho à publicação. Você foca no seu negócio.",
  },
];

function ItemFaq({ q, a, aberto, onToggle }: { q: string; a: string; aberto: boolean; onToggle: () => void }) {
  const id = useId();
  const painelId = `faq-painel-${id}`;
  const botaoId = `faq-botao-${id}`;
  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          id={botaoId}
          type="button"
          aria-expanded={aberto}
          aria-controls={painelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-paper transition hover:text-accent"
        >
          <span className="font-display text-lg">{q}</span>
          <span
            aria-hidden
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-paper/70 transition-transform duration-300 ${
              aberto ? "rotate-45" : ""
            }`}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M8 2.5v11M2.5 8h11" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={painelId}
        role="region"
        aria-labelledby={botaoId}
        hidden={!aberto}
        className="pb-5 pr-10 text-paper/70"
      >
        {a}
      </div>
    </div>
  );
}

export function Faq() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <SecaoTitulo kicker="Perguntas frequentes" titulo="Ainda em dúvida? A gente responde." />

      <div className="mt-10">
        {PERGUNTAS.map((p, i) => (
          <ItemFaq
            key={p.q}
            q={p.q}
            a={p.a}
            aberto={aberto === i}
            onToggle={() => setAberto((v) => (v === i ? null : i))}
          />
        ))}
      </div>
    </section>
  );
}
