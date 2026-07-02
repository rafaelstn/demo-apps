"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { AppScreen } from "@/components/apps/_ui/AppScreen";
import type { ItemNav } from "@/components/apps/_ui/BottomNav";
import { BarraVoltar, Cabecalho, Icone, Tag } from "@/components/apps/_ui/ui";
import { AULAS, TREINO_DO_DIA, CAPA_ACADEMIA, type Aula } from "@/lib/mock/academia";

export function TreinoApp({ accent }: { accent: string }) {
  const [aulaSel, setAulaSel] = useState<Aula | null>(null);
  const [reservadas, setReservadas] = useState<string[]>([]);

  return (
    <AppRuntime
      telaInicial="grade"
      render={({ tela, go, openModal }: ScreenApi) => {
        const nav: ItemNav[] = [
          { id: "aulas", label: "Aulas", icone: "aulas", onSelect: () => go("grade") },
          { id: "treino", label: "Treino", icone: "treino", onSelect: () => go("treino") },
          {
            id: "perfil",
            label: "Perfil",
            icone: "perfil",
            onSelect: () => openModal("Seu perfil", "No app real, aqui ficam o seu plano, a frequência, a evolução de carga e o histórico de check-ins. Nesta demonstração o foco é reservar uma aula."),
          },
        ];

        if (tela === "grade") {
          return (
            <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="aulas">
              <div className="relative">
                <img src={CAPA_ACADEMIA} alt="Academia" loading="lazy" decoding="async" className="h-40 w-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accent}E6, rgba(0,0,0,0.35))` }} />
                <button
                  onClick={() => go("treino")}
                  className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur transition active:scale-95"
                >
                  <Icone id="treino" className="h-3.5 w-3.5" /> Meu treino
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <Tag accent={accent} tone="glass">Hoje</Tag>
                  <p className="mt-1.5 font-display text-2xl leading-tight">TreinoApp</p>
                  <p className="text-[12px] text-white/90">Aulas de hoje · reserve a sua vaga.</p>
                </div>
              </div>

              <ul className="space-y-3 px-4 pt-4">
                {AULAS.map((a) => {
                  const lotada = a.vagas === 0;
                  return (
                    <li key={a.id}>
                      <button
                        onClick={() => {
                          setAulaSel(a);
                          go("aula");
                        }}
                        className="flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-2.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition active:scale-[0.99]"
                      >
                        <div className="relative shrink-0">
                          <img src={a.img} alt={a.nome} loading="lazy" decoding="async" className="h-16 w-16 rounded-xl object-cover" />
                          <span className="absolute inset-x-0 bottom-0 rounded-b-xl bg-black/45 py-0.5 text-center text-[9px] font-semibold uppercase tracking-wide text-white">{a.intensidade}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-ink">{a.nome}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-faint">
                            <Icone id="relogio" className="h-3.5 w-3.5" /> {a.horario} · {a.duracao}
                          </p>
                          <p className="text-[12px] text-ink-faint">{a.instrutor}</p>
                        </div>
                        <span
                          className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                          style={{ backgroundColor: lotada ? "rgba(0,0,0,0.05)" : `${accent}14`, color: lotada ? "#8A8A92" : accent }}
                        >
                          {lotada ? "Lotada" : `${a.vagas} vagas`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "aula") {
          if (!aulaSel) return null;
          const lotada = aulaSel.vagas === 0;
          const reservada = reservadas.includes(aulaSel.id);
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <button
                  onClick={() => go("reservar")}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                  style={{ backgroundColor: reservada ? "#5A5A62" : accent }}
                >
                  {reservada ? "Ver reserva" : lotada ? "Entrar na lista de espera" : "Reservar vaga"}
                </button>
              }
            >
              <BarraVoltar titulo={aulaSel.nome} onVoltar={() => go("grade")} accent={accent} />
              <div className="relative">
                <img src={aulaSel.img} alt={aulaSel.nome} loading="lazy" decoding="async" className="h-52 w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <Tag accent={accent} tone="glass">{aulaSel.intensidade}</Tag>
                  <span className="text-[12px] font-medium text-white">{aulaSel.duracao}</span>
                </div>
              </div>
              <div className="px-4 pt-4">
                <p className="font-display text-lg text-ink">{aulaSel.nome}</p>
                <div className="mt-3 space-y-2.5 rounded-2xl border border-black/[0.06] bg-white p-4 text-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <Info rotulo="Instrutor" valor={aulaSel.instrutor} />
                  <Info rotulo="Horário" valor={`${aulaSel.horario} · ${aulaSel.duracao}`} />
                  <Info rotulo="Vagas restantes" valor={lotada ? "Turma lotada" : `${aulaSel.vagas} vagas`} />
                </div>
              </div>
            </AppScreen>
          );
        }

        if (tela === "reservar") {
          if (!aulaSel) return null;
          const lotada = aulaSel.vagas === 0;
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <button
                  onClick={() => {
                    if (lotada) {
                      openModal("Turma lotada", `A aula de ${aulaSel.nome} das ${aulaSel.horario} está sem vagas. Entre na lista de espera e avisamos se abrir uma vaga.`);
                      return;
                    }
                    setReservadas((r) => (r.includes(aulaSel.id) ? r : [...r, aulaSel.id]));
                    go("checkin");
                  }}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  {lotada ? "Entrar na lista de espera" : "Confirmar reserva"}
                </button>
              }
            >
              <BarraVoltar titulo="Confirmar reserva" onVoltar={() => go("aula")} accent={accent} />
              <div className="px-4 py-6 text-center">
                <img src={aulaSel.img} alt={aulaSel.nome} loading="lazy" decoding="async" className="mx-auto h-28 w-28 rounded-2xl object-cover shadow-md" />
                <p className="mt-4 font-display text-lg text-ink">{aulaSel.nome}</p>
                <p className="mt-1 text-sm text-ink-faint">{aulaSel.horario} · {aulaSel.instrutor}</p>
                {lotada ? (
                  <p className="mt-4 rounded-xl bg-black/[0.04] px-3 py-2 text-sm text-ink-faint">Esta turma está sem vagas no momento.</p>
                ) : null}
              </div>
            </AppScreen>
          );
        }

        if (tela === "checkin") {
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <button
                  onClick={() => openModal("Check-in confirmado", "Sua presença foi registrada. Bom treino! No app real a catraca libera automaticamente.")}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  Fazer check-in
                </button>
              }
            >
              <BarraVoltar titulo="Check-in" onVoltar={() => go("grade")} accent={accent} />
              <div className="px-4 py-6 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold" style={{ backgroundColor: `${accent}14`, color: accent }}>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: accent }} /> Reserva confirmada
                </span>
                <p className="mt-3 text-sm text-ink-faint">{aulaSel ? `${aulaSel.nome} · ${aulaSel.horario}` : "Sua aula reservada"}</p>
                <div className="mx-auto mt-5 grid h-44 w-44 place-items-center rounded-2xl border border-black/10 bg-white shadow-sm">
                  <div className="grid h-32 w-32 grid-cols-5 grid-rows-5 gap-1 rounded-lg p-2" style={{ backgroundColor: `${accent}0F` }}>
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className="rounded-[2px]" style={{ backgroundColor: (i * 7 + (i % 4)) % 3 === 0 ? accent : "transparent" }} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-faint">Mostre este código na recepção para liberar a catraca.</p>
              </div>
            </AppScreen>
          );
        }

        // treino
        return (
          <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="treino">
            <Cabecalho titulo="Treino de hoje" sub="Ficha A · Corpo inteiro" accent={accent} />
            <ul className="px-4 pt-3">
              {TREINO_DO_DIA.map((e, idx) => (
                <li key={e.id} className="flex items-center gap-3 border-b border-black/[0.05] py-3 last:border-0">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold" style={{ backgroundColor: `${accent}14`, color: accent }}>
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{e.nome}</p>
                    <p className="text-[12px] text-ink-faint">{e.grupo}</p>
                  </div>
                  <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[12px] font-semibold text-ink">{e.series}</span>
                </li>
              ))}
            </ul>
            <div className="h-4" />
          </AppScreen>
        );
      }}
    />
  );
}

function Info({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-faint">{rotulo}</span>
      <span className="font-semibold text-ink">{valor}</span>
    </div>
  );
}
