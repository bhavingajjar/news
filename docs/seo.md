# SEO

This app is a client-rendered SPA. Meta tags help link previews and route discovery; they do not replace server-rendered HTML for deep content indexing.

## What ships

| Piece | Location |
|-------|----------|
| Default title / description / theme-color | [`index.html`](../index.html) |
| Per-route title, description, canonical, OG, Twitter | [`PageMeta`](../src/components/seo/PageMeta.jsx) |
| JSON-LD `WebSite` / `CollectionPage` | Home + category pages |
| `robots.txt` | [`public/robots.txt`](../public/robots.txt) |
| `sitemap.xml` for known routes | [`public/sitemap.xml`](../public/sitemap.xml) |
| Default share image | [`public/og-default.svg`](../public/og-default.svg) |
| Semantic landmarks | `header`, `main`, `nav`, `article`, `time` |

## Canonical base

`VITE_SITE_URL` defaults to `https://bhavingajjar.github.io/news` and is used for canonical / OG URLs.

## Limits

- Crawlers that do not execute JavaScript may only see the shell HTML.
- Article bodies live on third-party publisher URLs; this site is an index, not a full-text mirror.
- For stronger SEO later, consider prerender or an SSR framework — out of scope for this Vite SPA.
