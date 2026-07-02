import type { JSX } from "react";
import { DeliveryApp } from "./delivery/DeliveryApp";
import { HoraCertaApp } from "./agendamento/HoraCertaApp";
import { VitrineApp } from "./loja/VitrineApp";
import { ClubeApp } from "./fidelidade/ClubeApp";
import { TreinoApp } from "./academia/TreinoApp";
import { LarCertoApp } from "./imobiliaria/LarCertoApp";

export type AppComponent = (props: { accent: string }) => JSX.Element;

export const APP_REGISTRY: Record<string, AppComponent> = {
  delivery: DeliveryApp,
  agendamento: HoraCertaApp,
  loja: VitrineApp,
  fidelidade: ClubeApp,
  academia: TreinoApp,
  imobiliaria: LarCertoApp,
};
