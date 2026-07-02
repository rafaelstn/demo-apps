"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import {
  SERVICOS,
  PROFISSIONAIS,
  HORARIOS_OCUPADOS,
  gerarHorarios,
  type Servico,
  type Profissional,
} from "@/lib/mock/agendamento";
import { formatBRL } from "@/lib/format";

type Agendamento = { id: string; servico: Servico; profissional: Profissional; horario: string };

export function HoraCertaApp({ accent }: { accent: string }) {
  const [servico, setServico] = useState<Servico | null>(null);
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [horario, setHorario] = useState<string | null>(null);
  const [meus, setMeus] = useState<Agendamento[]>([]);

  const horarios = gerarHorarios();
  const ocupados = new Set(HORARIOS_OCUPADOS);

  return (
    <AppRuntime
      telaInicial="servicos"
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

        if (tela === "servicos") {
          return (
            <div className="pb-8">
              <div className="px-4 pb-4 pt-5 text-white" style={{ backgroundColor: accent }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-xl">HoraCerta</p>
                    <p className="text-sm text-white/80">Escolha o serviço e marque sozinho.</p>
                  </div>
                  <button onClick={() => go("meus")} className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium">
                    Meus ({meus.length})
                  </button>
                </div>
              </div>
              <p className="px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">Serviços</p>
              <ul>
                {SERVICOS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setServico(s);
                        go("profissional");
                      }}
                      className="flex w-full items-center gap-3 border-b border-black/5 px-4 py-3.5 text-left"
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-black/5 text-2xl">{s.emoji}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink">{s.nome}</p>
                        <p className="text-xs text-ink-faint">{s.duracao}</p>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: accent }}>
                        {formatBRL(s.precoCentavos)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (tela === "profissional") {
          return (
            <div className="pb-8">
              <TopBar titulo="Escolha o profissional" voltarPara="servicos" />
              <ul>
                {PROFISSIONAIS.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        setProfissional(p);
                        go("horario");
                      }}
                      className="flex w-full items-center gap-3 border-b border-black/5 px-4 py-3.5 text-left"
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-black/5 text-2xl">{p.emoji}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink">{p.nome}</p>
                        <p className="text-xs text-ink-faint">{p.especialidade}</p>
                      </div>
                      <span className="text-lg text-ink-faint">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (tela === "horario") {
          return (
            <div className="pb-8">
              <TopBar titulo="Horários de hoje" voltarPara="profissional" />
              <p className="px-4 pt-4 text-sm text-ink-faint">
                {servico?.nome} com {profissional?.nome}
              </p>
              <div className="grid grid-cols-3 gap-2.5 px-4 pt-4">
                {horarios.map((h) => {
                  const indisponivel = ocupados.has(h);
                  return (
                    <button
                      key={h}
                      disabled={indisponivel}
                      onClick={() => {
                        setHorario(h);
                        go("confirmacao");
                      }}
                      className={
                        indisponivel
                          ? "cursor-not-allowed rounded-xl border border-black/5 bg-black/5 py-2.5 text-sm text-ink-faint line-through"
                          : "rounded-xl border border-black/10 py-2.5 text-sm font-medium text-ink transition hover:text-white"
                      }
                      style={indisponivel ? undefined : { borderColor: `${accent}55` }}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
              <p className="px-4 pt-4 text-xs text-ink-faint">Horários riscados já estão ocupados.</p>
            </div>
          );
        }

        if (tela === "confirmacao") {
          return (
            <div className="pb-28">
              <TopBar titulo="Confirmar agendamento" voltarPara="horario" />
              <div className="px-4 py-5">
                <div className="rounded-2xl border border-black/5 bg-paper-soft p-4">
                  <Linha rotulo="Serviço" valor={servico?.nome ?? "-"} />
                  <Linha rotulo="Profissional" valor={profissional?.nome ?? "-"} />
                  <Linha rotulo="Horário" valor={`Hoje, ${horario ?? "-"}`} />
                  <Linha rotulo="Duração" valor={servico?.duracao ?? "-"} />
                  <div className="mt-3 flex justify-between border-t border-black/5 pt-3">
                    <span className="text-sm font-semibold text-ink">Total</span>
                    <span className="text-sm font-semibold" style={{ color: accent }}>
                      {servico ? formatBRL(servico.precoCentavos) : "-"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!servico || !profissional || !horario) return;
                  setMeus((m) => [
                    { id: `ag-${Date.now()}`, servico, profissional, horario },
                    ...m,
                  ]);
                  setServico(null);
                  setProfissional(null);
                  setHorario(null);
                  go("meus");
                }}
                className="fixed inset-x-4 bottom-4 z-20 rounded-xl py-3 text-center font-medium text-white shadow-lg md:absolute"
                style={{ backgroundColor: accent }}
              >
                Confirmar agendamento
              </button>
            </div>
          );
        }

        // meus
        return (
          <div className="pb-8">
            <TopBar titulo="Meus agendamentos" voltarPara="servicos" />
            {meus.length === 0 ? (
              <div className="grid place-items-center px-8 py-16 text-center">
                <div>
                  <p className="text-4xl">📅</p>
                  <p className="mt-3 text-sm text-ink-faint">Você ainda não tem agendamentos.</p>
                  <button onClick={() => go("servicos")} className="mt-4 text-sm font-medium" style={{ color: accent }}>
                    Marcar um horário
                  </button>
                </div>
              </div>
            ) : (
              <ul className="px-4 pt-4">
                {meus.map((a) => (
                  <li key={a.id} className="mb-3 rounded-2xl border border-black/5 bg-paper-soft p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-ink">{a.servico.nome}</p>
                        <p className="text-xs text-ink-faint">
                          {a.profissional.nome} · Hoje, {a.horario}
                        </p>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: accent }}>
                        {formatBRL(a.servico.precoCentavos)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setMeus((m) => m.filter((x) => x.id !== a.id));
                        openModal(
                          "Agendamento cancelado",
                          `O horário de ${a.servico.nome} com ${a.profissional.nome} às ${a.horario} foi cancelado e a vaga liberada.`,
                        );
                      }}
                      className="mt-3 w-full rounded-lg border border-black/10 py-2 text-sm font-medium text-ink"
                    >
                      Cancelar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }}
    />
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-ink-faint">{rotulo}</span>
      <span className="font-medium text-ink">{valor}</span>
    </div>
  );
}
