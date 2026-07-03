import type { IconeId } from "@/components/apps/_ui/ui";

export type Cupom = {
  id: string;
  titulo: string;
  descricao: string;
  custoPontos: number;
  icone: IconeId;
};

export type Movimentacao = {
  id: string;
  descricao: string;
  data: string;
  pontos: number;
  tipo: "acumulados" | "resgatados";
};

export const PONTOS_ATUAIS = 1240;
export const META_PONTOS = 1500;
export const RECOMPENSA_META = "R$ 50 de desconto";

export const SELOS_TOTAL = 10;
export const SELOS_PREENCHIDOS = 7;

export const CUPONS: Cupom[] = [
  { id: "desc10", titulo: "R$ 10 OFF", descricao: "Desconto na próxima compra acima de R$ 50.", custoPontos: 300, icone: "etiqueta" },
  { id: "frete", titulo: "Frete grátis", descricao: "Válido para entregas na sua região.", custoPontos: 200, icone: "entrega" },
  { id: "brinde", titulo: "Brinde surpresa", descricao: "Retire um mimo da casa no balcão.", custoPontos: 450, icone: "presente" },
];

export const MOVIMENTACOES: Movimentacao[] = [
  { id: "m1", descricao: "Compra na loja", data: "2026-06-28", pontos: 120, tipo: "acumulados" },
  { id: "m2", descricao: "Resgate frete grátis", data: "2026-06-20", pontos: 200, tipo: "resgatados" },
  { id: "m3", descricao: "Indicação de amigo", data: "2026-06-14", pontos: 150, tipo: "acumulados" },
  { id: "m4", descricao: "Compra na loja", data: "2026-06-05", pontos: 90, tipo: "acumulados" },
  { id: "m5", descricao: "Resgate cupom R$ 10", data: "2026-05-30", pontos: 300, tipo: "resgatados" },
];
