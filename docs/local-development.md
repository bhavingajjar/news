# Local development

## Prerequisites

- Node.js 24+
- npm
- Optional: Python 3.12 + NewsAPI key to refresh JSON locally

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

Vite serves the app with `base: '/news/'`. Open the URL Vite prints (typically `http://localhost:5173/news/`).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` **including SEO prerender** (`vite build && node scripts/seo-prerender.mjs`) |
| `npm run preview` | Preview the production build (prerendered HTML + SPA) |
| `npm run lint` | Oxlint |

After `npm run build`, inspect prerendered output under `dist/index.html`, `dist/business/index.html` (and other categories), and `dist/404.html`. Each file should contain route-specific meta tags and a crawlable list of article links inside `#root`.

## Refresh news data locally

```bash
python -m pip install -r py-script/requirements.txt
python py-script/fetch_news.py YOUR_API_KEY
```

JSON files update under `public/data/`. Restart or hard-refresh the dev server if the browser cached an old response. Rebuild to refresh prerendered link lists from the latest JSON.

## Environment

| Variable | Role |
|----------|------|
| `VITE_APP_NAME` | Brand in header / titles |
| `VITE_SITE_URL` | Canonical and Open Graph base URL |

Vite only exposes variables prefixed with `VITE_`. The prerender script uses the same defaults as `src/config.js` when env vars are unset.
