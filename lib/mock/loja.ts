export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  precoCentavos: number;
  emoji: string;
  cor: string;
};

export const PRODUTOS: Produto[] = [
  { id: "tenis", nome: "Tênis Runner", descricao: "Amortecimento leve para corrida e dia a dia.", precoCentavos: 29900, emoji: "👟", cor: "#EDE9FE" },
  { id: "camiseta", nome: "Camiseta Basic", descricao: "Algodão premium, caimento reto, toque macio.", precoCentavos: 7900, emoji: "👕", cor: "#FCE7F3" },
  { id: "jaqueta", nome: "Jaqueta Jeans", descricao: "Lavagem clássica, corte moderno, unissex.", precoCentavos: 24900, emoji: "🧥", cor: "#DBEAFE" },
  { id: "bone", nome: "Boné Logo", descricao: "Aba curva com bordado da marca.", precoCentavos: 5900, emoji: "🧢", cor: "#DCFCE7" },
  { id: "mochila", nome: "Mochila Urban", descricao: "Compartimento para notebook e resistente à água.", precoCentavos: 18900, emoji: "🎒", cor: "#FEF3C7" },
  { id: "relogio", nome: "Relógio Slim", descricao: "Pulseira em couro e mostrador minimalista.", precoCentavos: 39900, emoji: "⌚", cor: "#E0E7FF" },
];
