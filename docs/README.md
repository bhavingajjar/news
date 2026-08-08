# Documentation

End-to-end notes for the **Top News** React 19 + Vite app.

## Contents

| Doc | Topic |
|-----|--------|
| [Architecture](./architecture.md) | App structure, routing, data flow |
| [Data pipeline](./data-pipeline.md) | NewsAPI → Python → `public/data` → UI |
| [Workflows](./workflows.md) | GitHub Actions for fetch + Pages deploy |
| [SEO](./seo.md) | Meta tags, sitemap, SPA limits |
| [Local development](./local-development.md) | Run, lint, fetch locally |

## Quick mental model

1. A scheduled Action calls NewsAPI and merges results into `public/data/*.json`.
2. Vite copies those files into `dist/` at build time.
3. The SPA loads JSON over `fetch` using the Vite `BASE_URL` (`/news/`).
4. GitHub Pages serves `dist/` from `https://bhavingajjar.github.io/news/`.
