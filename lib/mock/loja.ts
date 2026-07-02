export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  precoCentavos: number;
  emoji: string;
  cor: string;
  img: string;
  tag?: string;
  rating?: number;
  precoDeCentavos?: number;
};

export const PRODUTOS: Produto[] = [
  { id: "tenis", nome: "Tênis Runner", descricao: "Amortecimento leve para corrida e dia a dia.", precoCentavos: 29900, emoji: "👟", cor: "#EDE9FE", img: "/img/loja/tenis.jpg", tag: "Novo", rating: 4.8 },
  { id: "camiseta", nome: "Camiseta Basic", descricao: "Algodão premium, caimento reto, toque macio.", precoCentavos: 7900, emoji: "👕", cor: "#FCE7F3", img: "/img/loja/camiseta.jpg", rating: 4.6 },
  { id: "jaqueta", nome: "Jaqueta Jeans", descricao: "Lavagem clássica, corte moderno, unissex.", precoCentavos: 24900, precoDeCentavos: 29900, emoji: "🧥", cor: "#DBEAFE", img: "/img/loja/jaqueta.jpg", tag: "Oferta", rating: 4.9 },
  { id: "bone", nome: "Boné Logo", descricao: "Aba curva com bordado da marca.", precoCentavos: 5900, emoji: "🧢", cor: "#DCFCE7", img: "/img/loja/bone.jpg", rating: 4.5 },
  { id: "mochila", nome: "Mochila Urban", descricao: "Compartimento para notebook e resistente à água.", precoCentavos: 18900, emoji: "🎒", cor: "#FEF3C7", img: "/img/loja/mochila.jpg", tag: "Popular", rating: 4.7 },
  { id: "relogio", nome: "Relógio Slim", descricao: "Pulseira em couro e mostrador minimalista.", precoCentavos: 39900, emoji: "⌚", cor: "#E0E7FF", img: "/img/loja/relogio.jpg", rating: 5.0 },
];
