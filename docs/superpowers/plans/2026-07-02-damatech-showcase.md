# DamaTech Showcase — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recomendado) ou superpowers:executing-plans para implementar tarefa a tarefa. Steps usam checkbox (`- [ ]`).

**Goal:** Construir um site demonstrativo estático (Next export) com a identidade da DamaTech, galeria de 6 modelos de app navegáveis dentro de um simulador (moldura de celular no desktop, tela cheia no mobile), com camada de venda e página de regulamento, para fechar vendas no tráfego pago.

**Architecture:** Next.js App Router com `output: 'export'` (estático). Route único de galeria `/`, rota dinâmica `/demo/[id]` para cada app, e páginas institucionais `/regulamento`. Cada app demo é um conjunto de telas React navegadas por estado local dentro do componente `<PhoneFrame>`. Dados mock tipados em `lib/`. Nenhum backend.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS 3.4, fontes Geist + Inter (next/font/google). Deploy Vercel.

## Global Constraints

- Next.js 15, React 19, Tailwind 3.4, TypeScript strict (espelhar o site oficial em `f:\Projetos\Produtos\Site Damatech`).
- `output: 'export'` no `next.config`: build estático. Toda rota dinâmica `[id]` EXIGE `generateStaticParams`. Validar sempre com `next build`, não só `next dev`.
- Tokens oficiais: ink `#0A0A0B` / `#1A1A1D` / `#3A3A40` / `#5A5A62`; paper `#FFFFFF` / `#F6F6F4` / `#E7E7E3` / `#D6D6D0`; accent `#2563EB` / `#DBE4FF` / `#1E40AF`.
- Tema do site demonstrativo: dark premium (fundo ink, texto paper, accent azul). Frames de celular contrastam.
- Fontes: Inter (`--font-sans`, corpo), Geist (`--font-display`, títulos).
- Acentuação PT-BR correta em todo texto visível. Proibido travessão/dash como conector; usar vírgula, ponto, dois-pontos, parênteses.
- Proibido `window.alert/confirm/prompt`. Toda confirmação/ação sem backend usa `<Modal>` do projeto.
- Nenhum botão morto. CTA WhatsApp abre `wa.me/5511977953952` com texto pré-preenchido, nunca envia sozinho.
- Respeitar `prefers-reduced-motion` em animações.
- Commit atômico por fase, mensagem descritiva, sem secrets.
- Dados legais/comerciais: ver `docs/legal/regulamento-da-oferta.md`.

---

## File Structure

```
next.config.mjs            # output: 'export', images unoptimized
tsconfig.json              # strict, paths @/*
tailwind.config.ts         # tokens oficiais + fontes
postcss.config.mjs
app/
  layout.tsx               # fontes Inter+Geist, metadata, tema dark
  globals.css              # base dark + texturas (grão, grid)
  page.tsx                 # galeria dos 6 modelos + camada de venda
  demo/[id]/page.tsx       # generateStaticParams + simulador do modelo
  regulamento/page.tsx     # regulamento (conteúdo de docs/legal)
components/
  site/
    Header.tsx             # logo D + link site principal
    Footer.tsx             # contato, links, regulamento
    PriceBadge.tsx         # selo "a partir de R$ 5.000 · consulte o regulamento"
    ModeloCard.tsx         # card de um modelo na galeria
    CtaWhatsApp.tsx        # botão/flutuante WhatsApp pré-preenchido
    Modal.tsx              # dialog reutilizavel (substitui alert/confirm)
  simulator/
    PhoneFrame.tsx         # moldura desktop / fullscreen mobile
    AppRuntime.tsx         # roteador de telas por estado local
  apps/
    delivery/              # telas do app Delivery (referência)
    agendamento/
    loja/
    fidelidade/
    academia/
    imobiliaria/
lib/
  catalog/apps.ts          # catálogo tipado dos 6 modelos
  theme/tokens.ts          # tokens JS espelhados
  format/index.ts          # BRL, data, percentual
  mock/                    # dados mock por domínio
public/
  logo-d.svg               # logo DamaTech (copiar do site oficial)
```

---

## Task 1: Scaffold Next + identidade da marca

**Files:**
- Create: `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `package.json`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (placeholder inicial)
- Create: `lib/theme/tokens.ts`
- Create: `public/logo-d.svg` (copiar de `f:\Projetos\Produtos\Site Damatech\app\icon.svg` ou `public/`)

**Interfaces:**
- Produces: tokens em `lib/theme/tokens.ts` (`export const tokens = { ink, paper, accent, ... }`); classes Tailwind `bg-ink`, `text-paper`, `text-accent`, fontes `font-sans`/`font-display`.

- [ ] **Step 1: Inicializar projeto e dependências**

Run:
```bash
cd "f:/Projetos/Produtos/APPDEMO"
npm init -y
npm install next@15 react@19 react-dom@19
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss@3 postcss autoprefixer
```

- [ ] **Step 2: Configurar `next.config.mjs` para export estático**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

- [ ] **Step 3: `tsconfig.json` strict com paths**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: `lib/theme/tokens.ts` (fonte JS dos tokens)**

```ts
export const tokens = {
  ink: { DEFAULT: '#0A0A0B', soft: '#1A1A1D', muted: '#3A3A40', faint: '#5A5A62' },
  paper: { DEFAULT: '#FFFFFF', soft: '#F6F6F4', line: '#E7E7E3', edge: '#D6D6D0' },
  accent: { DEFAULT: '#2563EB', soft: '#DBE4FF', deep: '#1E40AF' },
} as const;
```

- [ ] **Step 5: `tailwind.config.ts` (tokens + fontes espelhando o site oficial)**

```ts
import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A0A0B', soft: '#1A1A1D', muted: '#3A3A40', faint: '#5A5A62' },
        paper: { DEFAULT: '#FFFFFF', soft: '#F6F6F4', line: '#E7E7E3', edge: '#D6D6D0' },
        accent: { DEFAULT: '#2563EB', soft: '#DBE4FF', deep: '#1E40AF' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.04', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(1.875rem, 3.5vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.035em' }],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 6: `postcss.config.mjs`**

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- [ ] **Step 7: `app/globals.css` (base dark + grão + grid)**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root { --background: #0A0A0B; --foreground: #F6F6F4; }
  body {
    background-color: var(--background);
    color: var(--foreground);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  ::selection { background-color: #2563EB; color: #ffffff; }
}

@layer components {
  .grain::after {
    content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 0;
    opacity: 0.06; mix-blend-mode: screen;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: 160px 160px;
  }
  .bg-grid {
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
  }
}
```

- [ ] **Step 8: `app/layout.tsx` (fontes + metadata)**

```tsx
import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' });
const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: 'DamaTech, crie o seu aplicativo',
  description: 'Aplicativos nativos sob medida. Escolha um modelo e veja rodando.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: `app/page.tsx` placeholder mínimo (só pra buildar)**

```tsx
export default function Home() {
  return <main className="min-h-screen grid place-items-center"><h1 className="font-display text-display-lg">DamaTech Showcase</h1></main>;
}
```

- [ ] **Step 10: Verificar build**

Run: `npx tsc --noEmit && npx next build`
Expected: build sem erros; pasta `out/` gerada.

- [ ] **Step 11: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next export + identidade DamaTech (tokens, fontes, tema dark)"
```

---

## Task 2: Catálogo tipado + formatadores + mock base

**Files:**
- Create: `lib/catalog/apps.ts`
- Create: `lib/format/index.ts`
- Create: `lib/mock/index.ts` (barrel; domínios entram nas fases dos apps)

**Interfaces:**
- Produces:
  - `type TelaId = string`
  - `type ModeloApp = { id: string; nicho: string; nome: string; tagline: string; descricaoVenda: string; accent: string; telas: TelaId[]; ctaWhats: string }`
  - `export const APPS: ModeloApp[]` e `export function getApp(id: string): ModeloApp | undefined`
  - `formatBRL(centavos: number): string`, `formatData(iso: string): string`

- [ ] **Step 1: `lib/format/index.ts`**

```ts
export function formatBRL(centavos: number): string {
  return (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
export function formatData(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}
```

- [ ] **Step 2: `lib/catalog/apps.ts` (os 6 modelos)**

```ts
export type TelaId = string;
export type ModeloApp = {
  id: string;
  nicho: string;
  nome: string;
  tagline: string;
  descricaoVenda: string;
  accent: string;
  telas: TelaId[];
  ctaWhats: string;
};

export const APPS: ModeloApp[] = [
  { id: 'delivery', nicho: 'Delivery e Restaurante', nome: 'SaborJá', tagline: 'Seu cardápio no bolso do cliente.', descricaoVenda: 'O cliente pede em segundos e acompanha a entrega. Você vende sem depender de aplicativo de terceiro que come sua margem.', accent: '#F97316', telas: ['cardapio', 'item', 'carrinho', 'acompanhar', 'sucesso'], ctaWhats: 'Quero um app de Delivery para o meu restaurante' },
  { id: 'agendamento', nicho: 'Agendamento', nome: 'HoraCerta', tagline: 'Sua agenda cheia, sem WhatsApp lotado.', descricaoVenda: 'Salão, barbearia ou clínica: o cliente marca sozinho o horário disponível. Você para de perder tempo confirmando no chat.', accent: '#2563EB', telas: ['servicos', 'profissional', 'horario', 'confirmacao', 'meus'], ctaWhats: 'Quero um app de Agendamento para o meu negócio' },
  { id: 'loja', nicho: 'Loja e Catálogo', nome: 'Vitrine', tagline: 'Sua loja aberta 24 horas.', descricaoVenda: 'Catálogo com carrinho e favoritos. O cliente compra do sofá e você vende fora do horário da loja física.', accent: '#7C3AED', telas: ['vitrine', 'produto', 'carrinho', 'checkout', 'favoritos'], ctaWhats: 'Quero um app de Loja para o meu comércio' },
  { id: 'fidelidade', nicho: 'Fidelidade e Cashback', nome: 'Clube+', tagline: 'Cliente que volta, cliente que rende.', descricaoVenda: 'Pontos, selos e cupons no celular do cliente. Ele volta mais e gasta mais para bater a próxima recompensa.', accent: '#059669', telas: ['saldo', 'carteirinha', 'cupons', 'resgatar', 'historico'], ctaWhats: 'Quero um app de Fidelidade para os meus clientes' },
  { id: 'academia', nicho: 'Academia e Estúdio', nome: 'TreinoApp', tagline: 'Aula reservada é aluno presente.', descricaoVenda: 'Grade de aulas, reserva de vaga e check-in pelo celular. Menos falta, mais controle de lotação.', accent: '#DC2626', telas: ['grade', 'aula', 'reservar', 'checkin', 'treino'], ctaWhats: 'Quero um app para a minha academia ou estúdio' },
  { id: 'imobiliaria', nicho: 'Imobiliária', nome: 'LarCerto', tagline: 'O imóvel certo, na mão do cliente.', descricaoVenda: 'Busca de imóveis com fotos, favoritos e agendamento de visita. O lead chega qualificado até você.', accent: '#0891B2', telas: ['busca', 'imovel', 'favoritos', 'visita', 'contato'], ctaWhats: 'Quero um app para a minha imobiliária' },
];

export function getApp(id: string): ModeloApp | undefined {
  return APPS.find((a) => a.id === id);
}
```

- [ ] **Step 3: `lib/mock/index.ts` (barrel vazio inicial)**

```ts
// Barrel dos mocks por domínio. Cada app adiciona seu módulo nas fases seguintes.
export {};
```

- [ ] **Step 4: Verificar build e commit**

Run: `npx tsc --noEmit && npx next build`
Expected: PASS.
```bash
git add -A
git commit -m "feat: catálogo tipado dos 6 modelos + formatadores BRL/data"
```

---

## Task 3: Componentes de site (Header, Footer, Modal, PriceBadge, CtaWhatsApp)

**Files:**
- Create: `components/site/Header.tsx`, `Footer.tsx`, `Modal.tsx`, `PriceBadge.tsx`, `CtaWhatsApp.tsx`

**Interfaces:**
- Produces:
  - `<Modal open={boolean} onClose={() => void} title={string}>children</Modal>`
  - `<CtaWhatsApp texto={string} className?={string} />` (monta `https://wa.me/5511977953952?text=...`)
  - `<PriceBadge />`, `<Header />`, `<Footer />`

- [ ] **Step 1: `components/site/Modal.tsx` (substitui alert/confirm; sem dialog nativo)**

```tsx
'use client';
import { useEffect } from 'react';

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-ink-soft ring-1 ring-white/10 p-6">
        <h3 className="font-display text-lg text-paper">{title}</h3>
        <div className="mt-2 text-sm text-paper/70">{children}</div>
        <button onClick={onClose} className="mt-5 w-full rounded-xl bg-accent py-2.5 text-sm font-medium text-white">Entendi</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: `components/site/CtaWhatsApp.tsx`**

```tsx
export function CtaWhatsApp({ texto, className = '' }: { texto: string; className?: string }) {
  const href = `https://wa.me/5511977953952?text=${encodeURIComponent(texto)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-deep ${className}`}>
      Falar no WhatsApp
    </a>
  );
}
```

- [ ] **Step 3: `components/site/PriceBadge.tsx`**

```tsx
import Link from 'next/link';
export function PriceBadge() {
  return (
    <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-ink-soft ring-1 ring-white/10 px-4 py-2 text-xs text-paper/80">
      <span className="font-display text-sm text-paper">a partir de R$ 5.000</span>
      <span aria-hidden className="text-paper/30">·</span>
      <span>apps nativos</span>
      <span aria-hidden className="text-paper/30">·</span>
      <span>código-fonte incluso</span>
      <span aria-hidden className="text-paper/30">·</span>
      <Link href="/regulamento" className="text-accent underline underline-offset-2">consulte o regulamento</Link>
    </div>
  );
}
```

- [ ] **Step 4: `components/site/Header.tsx` e `Footer.tsx`**

```tsx
// Header.tsx
import Link from 'next/link';
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-d.svg" alt="DamaTech" className="h-7 w-auto" />
          <span className="font-display text-lg text-paper">DamaTech</span>
        </Link>
        <a href="https://damatechsolutions.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-paper/70 hover:text-paper">Site principal</a>
      </div>
    </header>
  );
}
```

```tsx
// Footer.tsx
import Link from 'next/link';
export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-paper/60 flex flex-wrap items-center justify-between gap-4">
        <p>DamaTech Solutions · Guarulhos, SP</p>
        <div className="flex gap-5">
          <a href="https://wa.me/5511977953952" target="_blank" rel="noopener noreferrer" className="hover:text-paper">WhatsApp</a>
          <a href="https://damatechsolutions.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-paper">Site</a>
          <Link href="/regulamento" className="hover:text-paper">Regulamento</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Build e commit**

Run: `npx tsc --noEmit && npx next build`
```bash
git add -A
git commit -m "feat: componentes de site (Modal, CTA WhatsApp, selo de preço, header, footer)"
```

---

## Task 4: Galeria na home (`/`)

**Files:**
- Modify: `app/page.tsx`
- Create: `components/site/ModeloCard.tsx`

**Interfaces:**
- Consumes: `APPS` de `lib/catalog/apps.ts`; `Header`, `Footer`, `PriceBadge`, `CtaWhatsApp`.
- Produces: `<ModeloCard modelo={ModeloApp} />` que linka para `/demo/[id]`.

- [ ] **Step 1: `components/site/ModeloCard.tsx`**

```tsx
import Link from 'next/link';
import type { ModeloApp } from '@/lib/catalog/apps';

export function ModeloCard({ modelo }: { modelo: ModeloApp }) {
  return (
    <Link href={`/demo/${modelo.id}`} className="group relative overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-white/10 p-6 transition hover:ring-accent/50">
      <span className="inline-block rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: `${modelo.accent}22`, color: modelo.accent }}>{modelo.nicho}</span>
      <h3 className="mt-4 font-display text-xl text-paper">{modelo.nome}</h3>
      <p className="mt-1 text-sm text-paper/60">{modelo.tagline}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm text-accent">Ver app rodando →</span>
    </Link>
  );
}
```

- [ ] **Step 2: `app/page.tsx` (hero + grade + selo)**

```tsx
import { APPS } from '@/lib/catalog/apps';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { PriceBadge } from '@/components/site/PriceBadge';
import { CtaWhatsApp } from '@/components/site/CtaWhatsApp';
import { ModeloCard } from '@/components/site/ModeloCard';

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <section className="relative overflow-hidden bg-grid">
          <div className="mx-auto max-w-6xl px-5 py-20 text-center">
            <h1 className="font-display text-display-lg text-paper">Crie o seu aplicativo</h1>
            <p className="mx-auto mt-4 max-w-xl text-paper/70">Aplicativos nativos sob medida para o seu negócio. Escolha um modelo abaixo e veja rodando de verdade.</p>
            <div className="mt-6 flex justify-center"><PriceBadge /></div>
            <div className="mt-8 flex justify-center"><CtaWhatsApp texto="Quero criar o meu aplicativo com a DamaTech" /></div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 pb-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {APPS.map((m) => <ModeloCard key={m.id} modelo={m} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Build, verificar 6 cards, commit**

Run: `npx tsc --noEmit && npx next build`
Expected: home lista 6 cards linkando `/demo/<id>`.
```bash
git add -A
git commit -m "feat: galeria dos 6 modelos na home com hero e selo de preço"
```

---

## Task 5: Simulador (PhoneFrame + AppRuntime) e rota `/demo/[id]`

**Files:**
- Create: `components/simulator/PhoneFrame.tsx`, `components/simulator/AppRuntime.tsx`
- Create: `app/demo/[id]/page.tsx`
- Create: `components/apps/registry.ts` (mapa id → componente de app)

**Interfaces:**
- Produces:
  - `<PhoneFrame accent={string}>children</PhoneFrame>` (moldura no desktop `md:`, fullscreen no mobile).
  - `type AppScreenProps = { go: (tela: TelaId) => void; tela: TelaId; openModal: (title: string, body: string) => void }`
  - `type AppComponent = (props: { accent: string }) => JSX.Element` — cada app é auto-contido, gerencia sua própria navegação de telas via `AppRuntime`.
  - `APP_REGISTRY: Record<string, AppComponent>` em `components/apps/registry.ts`.
  - `generateStaticParams()` em `app/demo/[id]/page.tsx` retornando `APPS.map(a => ({ id: a.id }))`.

- [ ] **Step 1: `components/simulator/AppRuntime.tsx` (roteador de telas + modal embutido)**

```tsx
'use client';
import { useState, useCallback } from 'react';
import type { TelaId } from '@/lib/catalog/apps';
import { Modal } from '@/components/site/Modal';

export type ScreenApi = {
  tela: TelaId;
  go: (t: TelaId) => void;
  openModal: (title: string, body: string) => void;
};

export function AppRuntime({ telaInicial, render }: { telaInicial: TelaId; render: (api: ScreenApi) => React.ReactNode }) {
  const [tela, setTela] = useState<TelaId>(telaInicial);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);
  const go = useCallback((t: TelaId) => setTela(t), []);
  const openModal = useCallback((title: string, body: string) => setModal({ title, body }), []);
  return (
    <div className="relative h-full w-full overflow-y-auto">
      {render({ tela, go, openModal })}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title ?? ''}>{modal?.body}</Modal>
    </div>
  );
}
```

- [ ] **Step 2: `components/simulator/PhoneFrame.tsx` (moldura desktop / fullscreen mobile)**

```tsx
export function PhoneFrame({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <>
      {/* Mobile: tela cheia */}
      <div className="md:hidden fixed inset-0 z-10">{children}</div>
      {/* Desktop: moldura de celular */}
      <div className="hidden md:grid place-items-center py-10">
        <div className="relative" style={{ filter: `drop-shadow(0 30px 60px ${accent}33)` }}>
          <div className="relative h-[720px] w-[360px] rounded-[3rem] bg-black ring-1 ring-white/15 p-3">
            <div className="absolute left-1/2 top-3 z-20 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-white">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: `components/apps/registry.ts` (placeholder até os apps existirem)**

```ts
import type { JSX } from 'react';
export type AppComponent = (props: { accent: string }) => JSX.Element;
export const APP_REGISTRY: Record<string, AppComponent> = {};
```

- [ ] **Step 4: `app/demo/[id]/page.tsx` (generateStaticParams obrigatório)**

```tsx
import { notFound } from 'next/navigation';
import { APPS, getApp } from '@/lib/catalog/apps';
import { PhoneFrame } from '@/components/simulator/PhoneFrame';
import { APP_REGISTRY } from '@/components/apps/registry';
import { CtaWhatsApp } from '@/components/site/CtaWhatsApp';
import Link from 'next/link';

export function generateStaticParams() {
  return APPS.map((a) => ({ id: a.id }));
}

export default async function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const modelo = getApp(id);
  if (!modelo) notFound();
  const AppComp = APP_REGISTRY[id];
  return (
    <main className="min-h-screen bg-grid">
      {/* Painel de venda (desktop, ao lado da moldura) */}
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-2 md:items-center">
        <div className="order-2 md:order-1">
          <Link href="/" className="text-sm text-paper/60 hover:text-paper">← voltar aos modelos</Link>
          <span className="mt-4 inline-block rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: `${modelo.accent}22`, color: modelo.accent }}>{modelo.nicho}</span>
          <h1 className="mt-3 font-display text-display-md text-paper">{modelo.nome}</h1>
          <p className="mt-3 text-paper/70">{modelo.descricaoVenda}</p>
          <div className="mt-6"><CtaWhatsApp texto={modelo.ctaWhats} /></div>
        </div>
        <div className="order-1 md:order-2">
          {AppComp ? <PhoneFrame accent={modelo.accent}><AppComp accent={modelo.accent} /></PhoneFrame> : <p className="text-paper/50">App em construção.</p>}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Build e commit**

Run: `npx tsc --noEmit && npx next build`
Expected: as 6 rotas `/demo/<id>` são geradas estaticamente (mesmo com registry vazio, mostra "App em construção").
```bash
git add -A
git commit -m "feat: simulador (PhoneFrame desktop/mobile + AppRuntime) e rota estática /demo/[id]"
```

---

## Task 6: App de referência — Delivery (padrão para os demais)

**Files:**
- Create: `components/apps/delivery/DeliveryApp.tsx`
- Create: `lib/mock/delivery.ts`
- Modify: `components/apps/registry.ts` (registrar `delivery`)

**Interfaces:**
- Consumes: `AppRuntime`, `ScreenApi`, `formatBRL`.
- Produces: `DeliveryApp: AppComponent`. Padrão de telas reusado pelos apps 7-11.

- [ ] **Step 1: `lib/mock/delivery.ts`**

```ts
export type ItemCardapio = { id: string; nome: string; desc: string; precoCentavos: number; categoria: string };
export const CARDAPIO: ItemCardapio[] = [
  { id: 'burger', nome: 'Burger da Casa', desc: 'Pão brioche, 180g, cheddar, bacon', precoCentavos: 3290, categoria: 'Lanches' },
  { id: 'veggie', nome: 'Veggie Supreme', desc: 'Grão-de-bico, queijo, salada', precoCentavos: 2990, categoria: 'Lanches' },
  { id: 'batata', nome: 'Batata Rústica', desc: 'Porção com alecrim e maionese', precoCentavos: 1890, categoria: 'Acompanhamentos' },
  { id: 'refri', nome: 'Refrigerante Lata', desc: '350ml gelado', precoCentavos: 690, categoria: 'Bebidas' },
];
```

- [ ] **Step 2: `components/apps/delivery/DeliveryApp.tsx` (5 telas: cardapio → item → carrinho → acompanhar → sucesso)**

```tsx
'use client';
import { useState } from 'react';
import { AppRuntime, type ScreenApi } from '@/components/simulator/AppRuntime';
import { CARDAPIO, type ItemCardapio } from '@/lib/mock/delivery';
import { formatBRL } from '@/lib/format';

export function DeliveryApp({ accent }: { accent: string }) {
  const [carrinho, setCarrinho] = useState<ItemCardapio[]>([]);
  const total = carrinho.reduce((s, i) => s + i.precoCentavos, 0);
  const add = (i: ItemCardapio) => setCarrinho((c) => [...c, i]);

  return (
    <AppRuntime telaInicial="cardapio" render={(api: ScreenApi) => {
      const { tela, go } = api;
      const Header = ({ titulo }: { titulo: string }) => (
        <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 text-white" style={{ backgroundColor: accent }}>
          {tela !== 'cardapio' && <button aria-label="voltar" onClick={() => go('cardapio')}>←</button>}
          <span className="font-display text-base">{titulo}</span>
        </div>
      );

      if (tela === 'cardapio') return (
        <div className="pb-24">
          <Header titulo="SaborJá" />
          <ul className="divide-y">
            {CARDAPIO.map((i) => (
              <li key={i.id} className="flex items-center gap-3 p-4">
                <div className="flex-1">
                  <p className="font-medium text-ink">{i.nome}</p>
                  <p className="text-xs text-ink-faint">{i.desc}</p>
                  <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>{formatBRL(i.precoCentavos)}</p>
                </div>
                <button onClick={() => add(i)} className="rounded-lg px-3 py-1.5 text-sm text-white" style={{ backgroundColor: accent }}>+</button>
              </li>
            ))}
          </ul>
          {carrinho.length > 0 && (
            <button onClick={() => go('carrinho')} className="fixed bottom-4 left-4 right-4 md:absolute rounded-xl py-3 text-center text-white font-medium" style={{ backgroundColor: accent }}>
              Ver carrinho ({carrinho.length}) · {formatBRL(total)}
            </button>
          )}
        </div>
      );

      if (tela === 'carrinho') return (
        <div className="pb-24">
          <Header titulo="Seu carrinho" />
          {carrinho.length === 0 ? (
            <p className="p-8 text-center text-ink-faint">Carrinho vazio.</p>
          ) : (
            <ul className="divide-y">
              {carrinho.map((i, idx) => (
                <li key={idx} className="flex justify-between p-4 text-sm text-ink"><span>{i.nome}</span><span>{formatBRL(i.precoCentavos)}</span></li>
              ))}
            </ul>
          )}
          <div className="p-4 font-semibold text-ink">Total: {formatBRL(total)}</div>
          <button onClick={() => go('acompanhar')} className="fixed bottom-4 left-4 right-4 md:absolute rounded-xl py-3 text-center text-white font-medium" style={{ backgroundColor: accent }}>Finalizar pedido</button>
        </div>
      );

      if (tela === 'acompanhar') return (
        <div>
          <Header titulo="Acompanhar pedido" />
          <ol className="p-5 space-y-4">
            {['Pedido recebido', 'Em preparo', 'Saiu para entrega', 'Entregue'].map((etapa, idx) => (
              <li key={etapa} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full text-xs text-white" style={{ backgroundColor: idx <= 1 ? accent : '#D6D6D0' }}>{idx + 1}</span>
                <span className={idx <= 1 ? 'text-ink font-medium' : 'text-ink-faint'}>{etapa}</span>
              </li>
            ))}
          </ol>
          <button onClick={() => go('sucesso')} className="mx-5 rounded-xl px-4 py-2.5 text-sm text-white" style={{ backgroundColor: accent }}>Marcar como entregue</button>
        </div>
      );

      // sucesso
      return (
        <div className="grid h-full place-items-center p-8 text-center">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full text-white text-2xl" style={{ backgroundColor: accent }}>✓</div>
            <p className="mt-4 font-display text-lg text-ink">Pedido entregue!</p>
            <p className="mt-1 text-sm text-ink-faint">É assim que seu cliente pede no seu app.</p>
            <button onClick={() => go('cardapio')} className="mt-6 text-sm" style={{ color: accent }}>Fazer outro pedido</button>
          </div>
        </div>
      );
    }} />
  );
}
```

- [ ] **Step 3: Registrar no `components/apps/registry.ts`**

```ts
import type { JSX } from 'react';
import { DeliveryApp } from './delivery/DeliveryApp';
export type AppComponent = (props: { accent: string }) => JSX.Element;
export const APP_REGISTRY: Record<string, AppComponent> = {
  delivery: DeliveryApp,
};
```

- [ ] **Step 4: Build, testar navegação no browser (desktop mostra moldura, mobile tela cheia), commit**

Run: `npx tsc --noEmit && npx next build && npx next dev` (abrir `/demo/delivery`, navegar cardápio→carrinho→acompanhar→sucesso; redimensionar pra ver frame sumir no mobile).
Expected: fluxo completo, nenhum botão morto, sem dialog nativo.
```bash
git add -A
git commit -m "feat: app de referência Delivery (5 telas navegáveis) no simulador"
```

---

## Task 7: Apps Agendamento e Loja

**Files:**
- Create: `components/apps/agendamento/AgendamentoApp.tsx`, `lib/mock/agendamento.ts`
- Create: `components/apps/loja/LojaApp.tsx`, `lib/mock/loja.ts`
- Modify: `components/apps/registry.ts`

**Interfaces:**
- Consumes: mesmo padrão de `DeliveryApp` (AppRuntime + ScreenApi + formatBRL). Produces: `AgendamentoApp`, `LojaApp` registrados.

**Spec de telas (seguir o padrão do Delivery: header colorido com accent, navegação por `go`, ações sem backend via `openModal`, nenhum botão morto):**

- **Agendamento** (accent `#2563EB`): `servicos` (lista de serviços com preço e duração, mock em `agendamento.ts`: Corte, Barba, Combo, Coloração) → `profissional` (escolher entre 3 profissionais) → `horario` (grade de horários do dia, slots clicáveis) → `confirmacao` (resumo serviço+profissional+horário, botão "Confirmar" que vai para `meus`) → `meus` (lista "Meus agendamentos" com o recém-criado; botão cancelar abre `openModal('Agendamento cancelado', ...)`).
- **Loja** (accent `#7C3AED`): `vitrine` (grade de produtos com foto placeholder colorido, nome, preço) → `produto` (detalhe, botão adicionar ao carrinho e favoritar) → `carrinho` (itens + total, botão finalizar) → `checkout` (form mock de endereço/pagamento, botão "Confirmar compra" abre `openModal('Compra confirmada', ...)` e volta para vitrine) → `favoritos` (produtos favoritados; estado vazio "Nenhum favorito ainda").

- [ ] **Step 1: Criar `lib/mock/agendamento.ts` e `AgendamentoApp.tsx` seguindo o padrão do Delivery (5 telas acima).**
- [ ] **Step 2: Criar `lib/mock/loja.ts` e `LojaApp.tsx` (5 telas acima).**
- [ ] **Step 3: Registrar ambos em `registry.ts`.**
- [ ] **Step 4: Build + navegar `/demo/agendamento` e `/demo/loja`.**

Run: `npx tsc --noEmit && npx next build`
- [ ] **Step 5: Commit**
```bash
git add -A
git commit -m "feat: apps Agendamento e Loja navegáveis"
```

---

## Task 8: Apps Fidelidade, Academia e Imobiliária

**Files:**
- Create: `components/apps/fidelidade/FidelidadeApp.tsx`, `lib/mock/fidelidade.ts`
- Create: `components/apps/academia/AcademiaApp.tsx`, `lib/mock/academia.ts`
- Create: `components/apps/imobiliaria/ImobiliariaApp.tsx`, `lib/mock/imobiliaria.ts`
- Modify: `components/apps/registry.ts`

**Interfaces:** mesmo padrão. Produces: os 3 apps registrados; `APP_REGISTRY` completo com 6 entradas.

**Spec de telas:**

- **Fidelidade** (accent `#059669`): `saldo` (KPI grande de pontos + progresso pra próxima recompensa) → `carteirinha` (cartão de selos, X de 10 preenchidos) → `cupons` (lista de cupons disponíveis) → `resgatar` (confirmar resgate, `openModal('Cupom resgatado', ...)`) → `historico` (lista de acúmulos/resgates com data). Vocabulário travado: "cliente reativado", pontos "acumulados"/"resgatados".
- **Academia** (accent `#DC2626`): `grade` (aulas do dia com horário, vagas restantes) → `aula` (detalhe da aula, instrutor, vagas) → `reservar` (confirmar reserva; se lotada, `openModal('Turma lotada', ...)`) → `checkin` (botão de check-in com QR placeholder) → `treino` (treino do dia, lista de exercícios).
- **Imobiliária** (accent `#0891B2`): `busca` (filtros simples + lista de imóveis com foto placeholder, preço, quartos) → `imovel` (galeria placeholder, características, botão favoritar e agendar visita) → `favoritos` (imóveis salvos; vazio "Nenhum imóvel salvo") → `visita` (escolher data/horário da visita, confirmar) → `contato` (form mock de contato do corretor, `openModal('Solicitação enviada', ...)`).

- [ ] **Step 1: Criar mocks e componentes dos 3 apps seguindo o padrão do Delivery.**
- [ ] **Step 2: Registrar os 3 em `registry.ts` (registry final com 6 apps).**
- [ ] **Step 3: Build + navegar as 3 rotas.**

Run: `npx tsc --noEmit && npx next build`
Expected: as 6 rotas `/demo/*` navegáveis ponta a ponta.
- [ ] **Step 4: Commit**
```bash
git add -A
git commit -m "feat: apps Fidelidade, Academia e Imobiliária (registry completo)"
```

---

## Task 9: Página de regulamento (`/regulamento`)

**Files:**
- Create: `app/regulamento/page.tsx`

**Interfaces:**
- Consumes: conteúdo de `docs/legal/regulamento-da-oferta.md` (transpor para JSX legível; NÃO incluir o arquivo de observações internas).

- [ ] **Step 1: `app/regulamento/page.tsx`** — renderizar o regulamento com tipografia legível (título, seções numeradas, `max-w-prose`), `Header` e `Footer`. Copiar o texto de `docs/legal/regulamento-da-oferta.md` (18 seções). Metadata: `title: 'Regulamento da Oferta · DamaTech'`.

- [ ] **Step 2: Build + revisar acentuação e ausência de travessão.**

Run: `npx tsc --noEmit && npx next build`
- [ ] **Step 3: Commit**
```bash
git add -A
git commit -m "feat: página de regulamento da oferta"
```

---

## Task 10: Polish, QA e deploy

**Files:**
- Modify: conforme achados (responsividade, estados vazios, `prefers-reduced-motion`, CTA flutuante global).
- Create: `components/site/CtaFloating.tsx` (WhatsApp flutuante persistente na home e nas demos).

- [ ] **Step 1: Adicionar `CtaFloating` (botão WhatsApp fixo no canto) na home e nas páginas de demo (desktop).**
- [ ] **Step 2: Revisão da Fernanda (frontend/UX):** hierarquia, espaçamento, logo sem bolha, responsivo real (drawer/tela cheia), estados vazio/sucesso em cada app. Aplicar ajustes.
- [ ] **Step 3: QA (Thiago):** navegar as 6 rotas nos dois breakpoints; confirmar nenhum botão morto, nenhum `alert/confirm/prompt`, acentuação correta, todos os CTAs abrindo `wa.me` com texto certo.
- [ ] **Step 4: Segurança (André):** confirmar ausência de dado pessoal coletado/persistido, links externos com `rel="noopener noreferrer"`, sem secrets; revisar `/regulamento` sob ótica LGPD.
- [ ] **Step 5: Build final e deploy Vercel.**

Run: `npx tsc --noEmit && npx next build`
```bash
git add -A
git commit -m "polish: CTA flutuante, ajustes de UX e responsividade; QA e segurança"
npx vercel --prod
```

---

## Self-Review (cobertura da spec)

- Identidade real (tokens/fontes) → Task 1. ✓
- Catálogo tipado escalável → Task 2. ✓
- Frame desktop / tela cheia mobile → Task 5 (PhoneFrame). ✓
- 6 apps navegáveis → Tasks 6, 7, 8. ✓
- Nenhum botão morto / sem dialog nativo → Modal (Task 3) usado em todos os apps. ✓
- CTA WhatsApp pré-preenchido por nicho → Task 3 + usado em galeria/demo. ✓
- Selo "consulte o regulamento" + página → Task 3 (PriceBadge) + Task 9. ✓
- Produto = app nativo (texto de venda) → descrição na demo (Task 5) + regulamento (Task 9). ✓
- `next build` estático com generateStaticParams → Task 5. ✓
- QA + segurança + deploy → Task 10. ✓
