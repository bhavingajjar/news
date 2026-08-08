# Documentation

End-to-end notes for the **Top News** React 19 + Vite app.

## Contents

| Doc | Topic |
|-----|--------|
| [Architecture](./architecture.md) | App structure, routing, data flow, `seo.js` + prerender |
| [Data pipeline](./data-pipeline.md) | NewsAPI → Python → `public/data` → UI (+ build prerender) |
| [Workflows](./workflows.md) | GitHub Actions for fetch + Pages deploy |
| [SEO](./seo.md) | Meta tags, OG PNG, sitemap, build-time prerender, SPA limits |
| [Local development](./local-development.md) | Run, lint, build (with prerender), fetch locally |

## Quick mental model

1. A scheduled Action calls NewsAPI and merges results into `public/data/*.json`.
2. Vite copies those files into `dist/` at build time.
3. `scripts/seo-prerender.mjs` injects per-route SEO head tags and crawlable article links into static HTML.
4. The SPA loads JSON over `fetch` using the Vite `BASE_URL` (`/news/`) and updates the document head via `PageMeta`.
5. GitHub Pages serves `dist/` from `https://bhavingajjar.github.io/news/`.
