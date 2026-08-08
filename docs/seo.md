# SEO

This app is a client-rendered SPA on GitHub Pages. Runtime meta updates via `react-helmet-async`, and a **build-time prerender** step injects route-specific head tags plus crawlable article link lists into static HTML so non-JS crawlers still see useful content.

## What ships

| Piece | Location |
|-------|----------|
| Shared route SEO helpers | [`src/lib/seo.js`](../src/lib/seo.js) (`getRouteSeo`, OG constants, `PRERENDER_PATHS`) |
| Default title / description / robots / theme-color / OG baseline | [`index.html`](../index.html) |
| Per-route title, description, robots, canonical, OG, Twitter, JSON-LD | [`PageMeta`](../src/components/seo/PageMeta.jsx) |
| Build-time HTML injection | [`scripts/seo-prerender.mjs`](../scripts/seo-prerender.mjs) |
| JSON-LD `WebSite` / `CollectionPage` | Home + category via `getRouteSeo` |
| `robots.txt` | [`public/robots.txt`](../public/robots.txt) |
| `sitemap.xml` (all indexable routes + `lastmod`) | [`public/sitemap.xml`](../public/sitemap.xml) |
| Default share image (PNG 1536×1024) | [`public/og-default.png`](../public/og-default.png) |
| Semantic landmarks | `header`, `main`, `nav`, `article`, `time` |

## Canonical base

`VITE_SITE_URL` defaults to `https://bhavingajjar.github.io/news` and is used for canonical / OG URLs (`absoluteUrl` in `seo.js`).

## Runtime meta (`PageMeta` + `getRouteSeo`)

Pages call `getRouteSeo(path)` and pass the result into `PageMeta`:

| Route | Title pattern | Robots |
|-------|---------------|--------|
| `/` | Top Headlines · Top News | `index,follow` (+ preview hints) |
| `/{category}` | {Category} Headlines · Top News | `index,follow` (+ preview hints) |
| `/404` | Page not found · Top News | `noindex,follow` |

Open Graph / Twitter include PNG image URL, type, width `1536`, height `1024`, and alt text. Home uses `WebSite` JSON-LD (with `SearchAction`); categories use `CollectionPage`.

## Build-time prerender

`npm run build` runs `vite build && node scripts/seo-prerender.mjs`.

For each path in `['/', ...categories, '/404']` the script:

1. Reads `dist/index.html` as a template (asset URLs already use `/news/` base).
2. Strips baseline SEO tags and injects full head markup (title, description, robots, canonical, OG + Twitter with PNG dimensions, JSON-LD when present).
3. Injects crawlable HTML inside `#root`: an `<h1>` plus an `<ol>`/`ul` of up to ~40 article links from JSON (`public/data` or `dist/data`).
4. Writes:
   - `dist/index.html` — home
   - `dist/{category}/index.html` — each category
   - `dist/404.html` — not found (`noindex`); GitHub Pages serves this for unknown paths

**Data files**

- Home: `everything-en-news.json`
- Category: prefer `in-en-{category}.json`, fall back to `us-en-{category}.json`

Article titles and URLs are HTML-escaped. React still mounts normally and replaces `#root` when JS runs.

## Open Graph image

Use PNG (not SVG). Many crawlers and social platforms ignore or mishandle SVG for `og:image`. Dimensions are declared explicitly for richer previews.

## Limits remaining

- This is still a SPA: prerender covers known routes and a **snippet** of links, not full article bodies.
- Article bodies live on third-party publisher URLs; this site is an index, not a full-text mirror.
- Country filter is client-only; prerendered category pages use the India dump by default.
- Query-string or client-only states are not separate indexable URLs.
- Stronger SEO later would mean SSR/SSG of richer page content — optional beyond this Vite setup.
