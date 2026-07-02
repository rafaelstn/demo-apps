"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { AULAS, TREINO_DO_DIA, type Aula } from "@/lib/mock/academia";

export function TreinoApp({ accent }: { accent: string }) {
  const [aulaSel, setAulaSel] = useState<Aula | null>(null);
  const [reservadas, setReservadas] = useState<string[]>([]);

  return (
    <AppRuntime
      telaInicial="grade"
      render={({ tela, go, openModal }: ScreenApi) => {
        const TopBar = ({ titulo, voltarPara }: { titulo: string; voltarPara?: string }) => (
          <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3.5 text-white" style={{ backgroundColor: accent }}>
            {voltarPara && (
              <button aria-label="voltar" onClick={() => go(voltarPara)} className="text-lg leading-none">
                ←
              </button>
            )}
            <span className="font-display text-base">{titulo}</span>
          </div>
        );

        if (tela === "grade") {
          return (
            <div className="pb-8">
              <div className="px-4 pb-4 pt-5 text-white" style={{ backgroundColor: accent }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-xl">TreinoApp</p>
                    <p className="text-sm text-white/80">Aulas de hoje · reserve sua vaga.</p>
                  </div>
                  <button onClick={() => go("treino")} className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium">
                    Meu treino
                  </button>
                </div>
              </div>
              <ul>
                {AULAS.map((a) => {
                  const lotada = a.vagas === 0;
                  return (
                    <li key={a.id}>
                      <button
                        onClick={() => {
                          setAulaSel(a);
                          go("aula");
                        }}
                        className="flex w-full items-center gap-3 border-b border-black/5 px-4 py-3.5 text-left"
                      >
                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-black/5 text-2xl">{a.emoji}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-ink">{a.nome}</p>
                          <p className="text-xs text-ink-faint">
                            {a.horario} · {a.instrutor}
                          </p>
                        </div>
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: lotada ? "rgba(0,0,0,0.05)" : `${accent}1A`,
                            color: lotada ? "#5A5A62" : accent,
                          }}
                        >
                          {lotada ? "Lotada" : `${a.vagas} vagas`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        if (tela === "aula") {
          if (!aulaSel) return null;
          const lotada = aulaSel.vagas === 0;
          const reservada = reservadas.includes(aulaSel.id);
          return (
            <div className="pb-28">
              <TopBar titulo="Detalhe da aula" voltarPara="grade" />
              <div className="grid place-items-center py-8 text-6xl">{aulaSel.emoji}</div>
              <div className="px-4">
                <p className="font-display text-lg text-ink">{aulaSel.nome}</p>
                <div className="mt-4 space-y-2.5 rounded-2xl border border-black/5 bg-paper-soft p-4 text-sm">
                  <Info rotulo="Instrutor" valor={aulaSel.instrutor} />
                  <Info rotulo="Horário" valor={aulaSel.horario} />
                  <Info rotulo="Vagas restantes" valor={lotada ? "Turma lotada" : `${aulaSel.vagas} vagas`} />
                </div>
              </div>
              <button
                onClick={() => go("reservar")}
                className="fixed inset-x-4 bottom-4 z-20 rounded-xl py-3 text-center font-medium text-white shadow-lg md:absolute"
                style={{ backgroundColor: reservada ? "#5A5A62" : accent }}
              >
                {reservada ? "Ver reserva" : "Reservar vaga"}
              </button>
            </div>
          );
        }

        if (tela === "reservar") {
          if (!aulaSel) return null;
          const lotada = aulaSel.vagas === 0;
          return (
            <div className="pb-8">
              <TopBar titulo="Confirmar reserva" voltarPara="aula" />
              <div className="px-4 py-6 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-black/5 text-4xl">{aulaSel.emoji}</div>
                <p className="mt-4 font-display text-lg text-ink">{aulaSel.nome}</p>
                <p className="mt-1 text-sm text-ink-faint">
                  {aulaSel.horario} · {aulaSel.instrutor}
                </p>
                {lotada && (
                  <p className="mt-4 rounded-xl bg-black/5 px-3 py-2 text-sm text-ink-faint">
                    Esta turma está sem vagas no momento.
                  </p>
                )}
                <button
                  onClick={() => {
                    if (lotada) {
                      openModal(
                        "Turma lotada",
                        `A aula de ${aulaSel.nome} das ${aulaSel.horario} está sem vagas. Entre na lista de espera e avisamos se abrir uma vaga.`,
                      );
                      return;
                    }
                    setReservadas((r) => (r.includes(aulaSel.id) ? r : [...r, aulaSel.id]));
                    go("checkin");
                  }}
                  className="mt-6 w-full rounded-xl py-3 text-center font-medium text-white"
                  style={{ backgroundColor: accent }}
                >
                  {lotada ? "Entrar na lista de espera" : "Confirmar reserva"}
                </button>
              </div>
            </div>
          );
        }

        if (tela === "checkin") {
          return (
            <div className="pb-8">
              <TopBar titulo="Check-in" voltarPara="grade" />
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-ink-faint">
                  {aulaSel ? `${aulaSel.nome} · ${aulaSel.horario}` : "Sua aula reservada"}
                </p>
                <div className="mx-auto mt-5 grid h-44 w-44 place-items-center rounded-2xl border border-black/10 bg-white">
                  <div
                    className="grid h-32 w-32 grid-cols-4 grid-rows-4 gap-1 rounded-lg p-2"
                    style={{ backgroundColor: `${accent}12` }}
                  >
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-sm"
                        style={{ backgroundColor: (i * 7) % 3 === 0 ? accent : "transparent" }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-faint">Mostre este código na recepção para liberar a catraca.</p>
                <button
                  onClick={() =>
                    openModal(
                      "Check-in confirmado",
                      "Sua presença foi registrada. Bom treino! No app real a catraca libera automaticamente.",
                    )
                  }
                  className="mt-6 w-full rounded-xl py-3 text-center font-medium text-white"
                  style={{ backgroundColor: accent }}
                >
                  Fazer check-in
                </button>
              </div>
            </div>
          );
        }

        // treino
        return (
          <div className="pb-8">
            <TopBar titulo="Treino de hoje" voltarPara="grade" />
            <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">Ficha A · Corpo inteiro</p>
            <ul className="pt-2">
              {TREINO_DO_DIA.map((e) => (
                <li key={e.id} className="flex items-center gap-3 border-b border-black/5 px-4 py-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-sm font-semibold text-ink">
                    {e.grupo.slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">{e.nome}</p>
                    <p className="text-xs text-ink-faint">{e.grupo}</p>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: accent }}>
                    {e.series}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
}

function Info({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-faint">{rotulo}</span>
      <span className="font-medium text-ink">{valor}</span>
    </div>
  );
}
