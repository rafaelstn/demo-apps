# DamaTech Showcase — Spec de Design

Data: 2026-07-02
Autor: Matheus (CTO, Damatech DevOS)
Status: aprovado na estrutura pelo Rafael, aguardando revisão da spec escrita

---

## 1. Objetivo

Peça de venda navegável para o tráfego pago da DamaTech ("Crie o seu aplicativo, a partir de R$ 5.000"). Um site demonstrativo com a identidade da DamaTech, onde o lead escolhe um modelo de app do nicho dele e vê o app rodando de verdade. Ferramenta de closing em call/reunião e link de apoio no anúncio.

O produto vendido são **aplicativos nativos** (Android e iOS) sob medida. Não é plataforma nem aplicação web. A demo é web apenas para demonstrar o app; o entregável real é nativo. O texto de venda e o regulamento deixam isso explícito.

Meta de conversão: o lead se identifica com um nicho, navega no app demo e clica no CTA de WhatsApp pré-preenchido ("Quero um app de [nicho]").

## 2. Não-objetivos (fora do v1)

- Backend real, banco, autenticação funcional, persistência.
- Área logada, painel administrativo, pagamento.
- App nativo publicado em loja. É demonstração web que simula app, não produto entregue.
- Mais de 6 modelos no v1 (a arquitetura escala para adicionar depois).

## 3. Público e uso

- Lead de PME vindo de tráfego pago, muitas vezes no celular.
- Rafael usa ao vivo na call ("qual app você quer? olha aqui") e como link de apoio.

## 4. Identidade visual (fonte: código de `f:\Projetos\Produtos\Site Damatech`)

Espelhar a marca real, não inventar (regra `padrao-ui`).

- Paleta ink: `#0A0A0B` (default), `#1A1A1D` (soft), `#3A3A40` (muted), `#5A5A62` (faint).
- Paleta paper: `#FFFFFF` (default), `#F6F6F4` (soft), `#E7E7E3` (line), `#D6D6D0` (edge).
- Ivory: `#F4F1EA`, deep `#E8E2D4`.
- Accent (azul): `#2563EB` (default), `#DBE4FF` (soft), `#1E40AF` (deep).
- Tipografia: Inter (`--font-sans`, corpo) + Geist (`--font-display`, títulos), via `next/font/google`.
- Escala display com `clamp` e `letter-spacing` negativo (~ -0.04em), estilo editorial.
- Texturas da marca: grão (`.grain`), grid de fundo (`bg-grid-ink`), spotlight nos cards, reveal on scroll, radial-spot azul.
- **Tema com liberdade criativa (aprovado pelo Rafael):** pode inverter a paleta e fazer algo bem bonito. Direção definida: site demonstrativo em **tema dark premium** (fundo ink `#0A0A0B`, texto paper, accent azul `#2563EB` com glow), que casa com o anúncio de tráfego e faz os apps saltarem. Os frames de celular podem ser claros por contraste, ou o inverso; decisão de execução da Fernanda, mantendo os tokens oficiais da marca.

## 5. Arquitetura técnica

Mesmo padrão validado no DamaCommerce (ver playbook `playbook-demo-saas-premium`).

- Next.js App Router + `output: 'export'` (estático, portável, deploy Vercel).
- Tailwind 3.4 (mesma versão do site real), tokens replicados em `tailwind.config.ts` + `lib/theme/tokens.ts` (valores JS para qualquer consumidor que não leia classe CSS).
- TypeScript strict.
- Sem dependência de backend. jsPDF só se algum modelo precisar gerar um "orçamento" fake em PDF (import dinâmico no clique); avaliar na fase, não obrigatório.

### Rotas

- `/` — landing/galeria: hero curto com a promessa + grade dos 6 modelos de app + selo comercial.
- `/demo/[id]` — o app do modelo rodando dentro do simulador. `generateStaticParams` gera as 6 páginas no build (obrigatório no export; validar sempre com `next build`, `next dev` engana).
- `/regulamento` — regulamento da oferta (termos e condições comerciais). Página institucional linkada no selo de preço e no rodapé. Conteúdo redigido pela Paula (PO Cliente/Contrato), revisado por André (LGPD) no fechamento. Ver seção 9.1.

### Estrutura de pastas (proposta)

```
app/
  layout.tsx            # fontes Inter+Geist, metadata
  globals.css           # base + texturas da marca
  page.tsx              # galeria dos modelos
  demo/[id]/page.tsx    # simulador + app do modelo
components/
  site/                 # header, footer, cta-whatsapp, card-modelo
  simulator/            # PhoneFrame (frame desktop / fullscreen mobile), AppScreenRouter
  apps/                 # telas de cada modelo (um subdir por nicho)
lib/
  catalog/apps.ts       # catálogo tipado dos 6 modelos
  theme/tokens.ts       # tokens JS espelhados
  mock/                 # dados mock tipados por domínio
  format/               # BRL, data, percentual
```

## 6. Catálogo de modelos (tipado)

Cada modelo é um objeto na lista `lib/catalog/apps.ts`. Adicionar o 7º modelo = adicionar um item, sem reescrever página.

```ts
type ModeloApp = {
  id: string;              // slug, ex: "agendamento"
  nicho: string;           // "Agendamento"
  nome: string;            // nome fantasia do app demo
  tagline: string;         // 1 linha de dor/valor do nicho
  accent: string;          // cor de destaque do app (dentro do frame)
  telas: TelaId[];         // ordem de navegação
  ctaWhats: string;        // texto pré-preenchido do WhatsApp
};
```

### Os 6 modelos do v1

1. Delivery/Restaurante — cardápio → item → carrinho → acompanhar pedido → concluído.
2. Agendamento (salão/barbearia/clínica) — serviços → escolher profissional → horário → confirmação → meus agendamentos.
3. Loja/Catálogo — vitrine → produto → carrinho → checkout (mock) → favoritos.
4. Fidelidade/Cashback/Clube — saldo de pontos → carteirinha/selos → cupons → resgatar → histórico.
5. Academia/Estúdio — grade de aulas → aula → reservar vaga → check-in → treino do dia.
6. Imobiliária — busca → imóvel (galeria) → favoritar → agendar visita → contato.

Cada modelo: 4-5 telas que contam a história do nicho, navegáveis de verdade, com dados mock.

## 7. Simulador (componente central)

`<PhoneFrame>` decide o invólucro por breakpoint CSS:

- Desktop (>= md): app renderiza dentro de moldura de iPhone centralizada, fundo dark com brilho azul da marca ao redor; ao lado, painel de venda do nicho (nome, tagline, bullets do anúncio, CTA WhatsApp).
- Mobile (< md): moldura some, app ocupa a tela inteira; o celular do cliente vira o app. Barra fina no topo com "voltar para modelos" e CTA.

Mesmo app renderizado; só muda a casca. As telas de cada app trocam via estado local (roteador de telas interno ao simulador), sem mudar URL — navegação instantânea, sensação de app.

## 8. Estados e qualidade (regras da casa)

- Nenhum botão morto: toda ação sem backend abre modal de confirmação/detalhe (nunca `window.alert/confirm/prompt`). Componente `ConfirmDialog`/`Modal` reutilizável.
- CTA de WhatsApp abre o `wa.me` com texto pré-preenchido do nicho; nunca dispara envio automático (padrão "abre para revisar").
- Estados cobertos onde fizer sentido: vazio (carrinho vazio, sem agendamentos), sucesso (pedido feito), loading curto opcional para dar vida.
- Acentuação PT-BR correta em todo texto visível. Sem travessão/dash como conector.
- Responsivo real: testado em mobile e desktop; frame só no desktop.
- `prefers-reduced-motion` respeitado em animações (reveal, count-up se houver).

## 9. Camada de venda

- Header: logo D + "Crie o seu app". Link para o site principal.
- Selo/prova: "a partir de R$ 5.000 · apps nativos · código-fonte incluso · UI/UX completo", com link **"consulte o regulamento"** apontando para `/regulamento`.
- Destaques comerciais na landing (retirados dos parâmetros do Rafael): apps nativos Android e iOS; código-fonte incluso; UI/UX completo; 1 mês de suporte e garantia; publicação na Google Play inclusa; App Store (Apple) ou entrega em APK conforme opção.
- CTA de WhatsApp flutuante e no painel de cada modelo, com o nicho no texto, abrindo `wa.me/5511977953952` pré-preenchido.
- Rodapé enxuto com contato/WhatsApp, link para damatechsolutions.com.br e link para `/regulamento`.

### 9.1. Regulamento da oferta (`/regulamento`)

Termos e condições comerciais, com valor jurídico defensivo, para vincular ao anúncio e embasar a proposta/contrato. Parâmetros comerciais a refletir (definidos pelo Rafael):

- Produto: aplicativos nativos (Android e iOS) sob medida; não é aplicação web.
- Preço: a partir de R$ 5.000,00 (valor inicial; final conforme escopo/orçamento).
- Pagamento: entrada mínima de R$ 2.000,00 para início; saldo negociável.
- Inclui: UI/UX completo; código-fonte incluso; 1 mês de suporte e garantia; publicação na Google Play sem custo adicional de serviço.
- Apple/App Store: cobrada à parte (conta e taxas da plataforma); alternativa de entrega apenas do APK.
- Fora do escopo inicial: cobrado à parte por aditivo.
- Proteções: escopo por proposta aprovada; garantia limitada a defeitos do entregue; não garantia de aprovação nas lojas; custos de terceiros por conta do cliente; responsabilidades do cliente; propriedade do código após quitação; LGPD (Lei 13.709/2018); limitação de responsabilidade; cancelamento/rescisão; foro de Guarulhos/SP.

Dados legais reais (fonte: `content/site.ts` do site oficial): Rafael Damasceno Santana Soluções em Tecnologia Ltda, CNPJ 22.364.409/0001-20, contato@damatechsolutions.com.br, WhatsApp +55 11 97795-3952, Guarulhos/SP.

Disclaimer: o regulamento é minuta comercial; recomenda-se validação por advogado antes do uso oficial. Em conflito, a proposta específica assinada prevalece sobre o regulamento geral.

## 10. Segurança e LGPD

- Sem coleta de dado pessoal no v1 (nenhum formulário que grava). CTA leva pro WhatsApp.
- Se entrar algum campo (ex: nome no orçamento fake), é local, não persiste, sem envio. Revisar com André se surgir.
- Sem secrets no repo. Deploy estático.

## 11. Processo de execução

Fase a fase, Fernanda conduz o frontend (Matheus orquestra), `tsc --noEmit` + `next build` verde e commit atômico por fase. Thiago (QA) e André (segurança) no fechamento. Deploy Vercel.

Fatiamento sugerido (detalhar no plano):

1. Scaffold + identidade (tokens, fontes, globals, shell da galeria).
2. Simulador (`PhoneFrame` desktop/mobile) + catálogo tipado + 1 app de referência (Delivery) ponta a ponta.
3. Demais 5 apps (um por vez, reusando telas/componentes).
4. Camada de venda (CTAs WhatsApp, selo de preço, painel de nicho) + página `/regulamento` + polish.
5. QA (Thiago) + segurança/LGPD (André revisa o regulamento) + deploy Vercel.

## 12. Critérios de aceite (v1)

- Galeria mostra os 6 modelos com a identidade real da DamaTech.
- Cada modelo abre e é navegável ponta a ponta (todas as telas do fluxo).
- Frame de celular no desktop; app em tela cheia no mobile.
- Nenhum botão morto; nenhum dialog nativo do navegador.
- CTA de WhatsApp abre conversa pré-preenchida com o nicho.
- Selo de preço com link "consulte o regulamento" e página `/regulamento` publicada, com os parâmetros comerciais corretos e revisão de LGPD.
- `next build` verde (export estático) e deploy Vercel funcionando.
- Acentuação e responsividade validadas.
