export type Imovel = {
  id: string;
  titulo: string;
  bairro: string;
  precoCentavos: number;
  quartos: number;
  banheiros: number;
  metros: number;
  vagas: number;
  emoji: string;
  cor: string;
  img: string;
  tag?: string;
};

export const IMOVEIS: Imovel[] = [
  { id: "apto2", titulo: "Apartamento 2 quartos", bairro: "Centro · São Paulo", precoCentavos: 32000000, quartos: 2, banheiros: 1, metros: 62, vagas: 1, emoji: "🏢", cor: "#CFFAFE", img: "/img/imobiliaria/apto.jpg", tag: "Destaque" },
  { id: "casa3", titulo: "Casa 3 quartos", bairro: "Jardim das Flores", precoCentavos: 54000000, quartos: 3, banheiros: 2, metros: 110, vagas: 2, emoji: "🏡", cor: "#DCFCE7", img: "/img/imobiliaria/casa.jpg", tag: "Novo" },
  { id: "studio", titulo: "Studio moderno", bairro: "Vila Nova", precoCentavos: 21000000, quartos: 1, banheiros: 1, metros: 38, vagas: 0, emoji: "🏬", cor: "#E0E7FF", img: "/img/imobiliaria/studio.jpg" },
];

export const DATAS_VISITA = ["Seg, 06/07", "Ter, 07/07", "Qua, 08/07", "Sex, 10/07"];
export const HORARIOS_VISITA = ["09:00", "11:00", "14:00", "16:00"];
