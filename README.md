# quizmoda

Quiz + página de oferta "Guía 30 prendas, 300 looks" (español, LatAm neutro).
Reconstrução do funil original em Vite + React + Tailwind, sem dependência do Lovable.

## Rodar local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # gera dist/
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builda e publica em GitHub Pages
a cada push na branch `main`.

Ativar uma vez: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Site sai em: `https://ojpmendest.github.io/quizmoda/`

## Métricas (PostHog)

`src/analytics.ts` inicializa o PostHog (projeto US Cloud) e dispara:

| Evento | Quando |
|---|---|
| `quiz_start` | abre o quiz |
| `quiz_step` (`step_name`, `step_index`) | cada tela vista — **use este no funil** |
| `quiz_answer` (`step`, `value`) | cada resposta |
| `quiz_complete` (`answers`) | terminou o quiz |
| `oferta_view` | abriu a página de oferta |
| `checkout_click` | clicou em qualquer botão de checkout |

### Montar o funil de abandono

PostHog → Product analytics → New insight → **Funnel**. Passos, nesta ordem
(todos = evento `quiz_step` filtrado por `step_name`):

`intro_start → age → challenge → climate → name → feeling → desire → loading1 → motivation → intro → plan → loading2`

Depois adicione `oferta_view` e `checkout_click`. O gráfico mostra onde cai mais gente.

## TODO (integrações — pendente)

- Checkout Hotmart em `src/pages/Oferta.tsx` (`CHECKOUT_BASE`) — trocar pelo checkout definitivo em dólar.
- GTM / Meta Pixel / verificação de domínio / VK Metrics — re-adicionar em `index.html` se for usar.
- Preço `US$ 9,90` e "Condición especial" na oferta — confirmar valores finais.
