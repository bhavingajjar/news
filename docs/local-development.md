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
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Oxlint |

## Refresh news data locally

```bash
python -m pip install -r py-script/requirements.txt
python py-script/fetch_news.py YOUR_API_KEY
```

JSON files update under `public/data/`. Restart or hard-refresh the dev server if the browser cached an old response.

## Environment

| Variable | Role |
|----------|------|
| `VITE_APP_NAME` | Brand in header / titles |
| `VITE_SITE_URL` | Canonical and Open Graph base URL |

Vite only exposes variables prefixed with `VITE_`.
