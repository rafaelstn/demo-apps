"use client";
import { useState } from "react";
import { AppRuntime, type ScreenApi } from "@/components/simulator/AppRuntime";
import { AppScreen } from "@/components/apps/_ui/AppScreen";
import type { ItemNav } from "@/components/apps/_ui/BottomNav";
import { BarraVoltar, Cabecalho, EstadoVazio, Icone, Rating, Tag } from "@/components/apps/_ui/ui";
import {
  SERVICOS,
  PROFISSIONAIS,
  HORARIOS_OCUPADOS,
  CAPA_SALAO,
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
        const nav: ItemNav[] = [
          { id: "servicos", label: "Serviços", icone: "servicos", onSelect: () => go("servicos") },
          { id: "agenda", label: "Agenda", icone: "agenda", onSelect: () => go("meus") },
          {
            id: "perfil",
            label: "Perfil",
            icone: "perfil",
            onSelect: () => openModal("Seu perfil", "No app real, aqui ficam os seus dados, o histórico de atendimentos e as suas preferências. Nesta demonstração o foco é marcar um horário."),
          },
        ];

        if (tela === "servicos") {
          return (
            <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="servicos">
              <div className="relative">
                <img src={CAPA_SALAO} alt="Ambiente do salão" loading="lazy" decoding="async" className="h-40 w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.05))" }} />
                <button
                  onClick={() => go("meus")}
                  className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur transition active:scale-95"
                >
                  <Icone id="agenda" className="h-3.5 w-3.5" /> Agenda ({meus.length})
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <Tag accent={accent} tone="glass">Aberto hoje</Tag>
                  <p className="mt-1.5 font-display text-2xl leading-tight">HoraCerta</p>
                  <div className="mt-1 flex items-center gap-3 text-[12px] text-white/90">
                    <Rating nota={4.9} color="#FDE68A" />
                    <span className="flex items-center gap-1"><Icone id="local" className="h-3.5 w-3.5" /> Centro</span>
                  </div>
                </div>
              </div>

              <p className="px-4 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Escolha o serviço</p>
              <ul className="space-y-3 px-4 pt-1">
                {SERVICOS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setServico(s);
                        go("profissional");
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-2.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition active:scale-[0.99]"
                    >
                      <div className="relative shrink-0">
                        <img src={s.img} alt={s.nome} loading="lazy" decoding="async" className="h-16 w-16 rounded-xl object-cover" />
                        {s.tag ? <span className="absolute left-1 top-1"><Tag accent={accent} tone="solid">{s.tag}</Tag></span> : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink">{s.nome}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-faint">
                          <Icone id="relogio" className="h-3.5 w-3.5" /> {s.duracao}
                        </p>
                        <p className="mt-1 text-sm font-bold" style={{ color: accent }}>{formatBRL(s.precoCentavos)}</p>
                      </div>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: accent }}>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7" /></svg>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="h-4" />
            </AppScreen>
          );
        }

        if (tela === "profissional") {
          return (
            <AppScreen statusColor={accent} accent={accent}>
              <BarraVoltar titulo="Escolha o profissional" onVoltar={() => go("servicos")} accent={accent} />
              <p className="px-4 pt-4 text-[13px] text-ink-faint">{servico?.nome} · {servico?.duracao}</p>
              <ul className="space-y-3 px-4 pt-3">
                {PROFISSIONAIS.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        setProfissional(p);
                        go("horario");
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 text-left transition active:scale-[0.99]"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-2xl" style={{ backgroundColor: `${accent}14` }}>{p.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">{p.nome}</p>
                        <p className="text-[12px] text-ink-faint">{p.especialidade}</p>
                      </div>
                      <Rating nota={p.rating} />
                    </button>
                  </li>
                ))}
              </ul>
            </AppScreen>
          );
        }

        if (tela === "horario") {
          return (
            <AppScreen statusColor={accent} accent={accent}>
              <BarraVoltar titulo="Horários de hoje" onVoltar={() => go("profissional")} accent={accent} />
              <p className="px-4 pt-4 text-[13px] text-ink-faint">
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
                          ? "cursor-not-allowed rounded-xl border border-black/5 bg-black/[0.04] py-2.5 text-sm text-ink-faint line-through"
                          : "rounded-xl border py-2.5 text-sm font-semibold text-ink transition active:scale-95"
                      }
                      style={indisponivel ? undefined : { borderColor: `${accent}40`, backgroundColor: `${accent}08` }}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
              <p className="flex items-center gap-1.5 px-4 pt-4 text-[12px] text-ink-faint">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-black/[0.08]" /> Horários riscados já estão ocupados.
              </p>
            </AppScreen>
          );
        }

        if (tela === "confirmacao") {
          return (
            <AppScreen
              statusColor={accent}
              accent={accent}
              footer={
                <button
                  onClick={() => {
                    if (!servico || !profissional || !horario) return;
                    setMeus((m) => [{ id: `ag-${Date.now()}`, servico, profissional, horario }, ...m]);
                    setServico(null);
                    setProfissional(null);
                    setHorario(null);
                    go("meus");
                  }}
                  className="w-full rounded-2xl py-3 text-center text-sm font-semibold text-white shadow-lg transition active:scale-[0.99]"
                  style={{ backgroundColor: accent }}
                >
                  Confirmar agendamento
                </button>
              }
            >
              <BarraVoltar titulo="Confirmar agendamento" onVoltar={() => go("horario")} accent={accent} />
              <div className="px-4 py-5">
                <div className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 border-b border-black/[0.06] pb-3">
                    {servico ? <img src={servico.img} alt={servico.nome} loading="lazy" decoding="async" className="h-14 w-14 rounded-xl object-cover" /> : null}
                    <div>
                      <p className="text-sm font-semibold text-ink">{servico?.nome}</p>
                      <p className="text-[12px] text-ink-faint">{servico?.duracao}</p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <Linha rotulo="Profissional" valor={profissional?.nome ?? "-"} />
                    <Linha rotulo="Horário" valor={`Hoje, ${horario ?? "-"}`} />
                    <div className="mt-2 flex justify-between border-t border-black/[0.06] pt-3">
                      <span className="text-sm font-bold text-ink">Total</span>
                      <span className="text-sm font-bold" style={{ color: accent }}>{servico ? formatBRL(servico.precoCentavos) : "-"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AppScreen>
          );
        }

        // meus
        return (
          <AppScreen statusColor={accent} accent={accent} nav={nav} navAtual="agenda">
            <Cabecalho titulo="Meus agendamentos" sub={meus.length > 0 ? `${meus.length} marcado(s)` : undefined} accent={accent} />
            {meus.length === 0 ? (
              <EstadoVazio icone="agenda" titulo="Nenhum agendamento ainda" texto="Escolha um serviço e marque o seu horário." acao="Marcar um horário" onAcao={() => go("servicos")} accent={accent} />
            ) : (
              <ul className="space-y-3 px-4 pt-4">
                {meus.map((a) => (
                  <li key={a.id} className="rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-3">
                      <img src={a.servico.img} alt={a.servico.nome} loading="lazy" decoding="async" className="h-12 w-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">{a.servico.nome}</p>
                        <p className="text-[12px] text-ink-faint">{a.profissional.nome} · Hoje, {a.horario}</p>
                      </div>
                      <span className="text-sm font-bold" style={{ color: accent }}>{formatBRL(a.servico.precoCentavos)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setMeus((m) => m.filter((x) => x.id !== a.id));
                        openModal("Agendamento cancelado", `O horário de ${a.servico.nome} com ${a.profissional.nome} às ${a.horario} foi cancelado e a vaga liberada.`);
                      }}
                      className="mt-3 w-full rounded-xl border border-black/10 py-2 text-sm font-semibold text-ink transition active:scale-[0.99]"
                    >
                      Cancelar
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="h-4" />
          </AppScreen>
        );
      }}
    />
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-ink-faint">{rotulo}</span>
      <span className="font-semibold text-ink">{valor}</span>
    </div>
  );
}
