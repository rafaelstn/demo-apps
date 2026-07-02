# DamaTech Showcase (demo-apps)

Site demonstrativo de venda da DamaTech: galeria de modelos de aplicativos nativos que o cliente navega na hora da venda. No desktop, cada app roda dentro de uma moldura de celular; no mobile, ocupa a tela inteira.

Peça de apoio ao tráfego pago ("Crie o seu aplicativo, a partir de R$ 5.000").

## Stack

- Next.js 15 (App Router) com `output: 'export'` (site estático)
- React 19 + TypeScript strict
- Tailwind CSS 3.4, fontes Inter + Geist
- Deploy: Vercel

## Rodar local

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # gera a pasta out/ (estático)
```

## Estrutura

- `app/` rotas: `/` (galeria), `/demo/[id]` (app no simulador), `/regulamento`
- `components/site/` header, footer, modal, selo de preço, CTA WhatsApp
- `components/simulator/` moldura de celular e roteador de telas
- `components/apps/` os apps demo por nicho
- `lib/catalog/apps.ts` catálogo tipado dos modelos
- `docs/` spec, plano e regulamento da oferta

## Modelos (v1)

Delivery · Agendamento · Loja · Fidelidade · Academia · Imobiliária

---

DamaTech Solutions · damatechsolutions.com.br
