# Data pipeline

## Purpose

NewsAPI keys must stay server-side. The browser never calls NewsAPI. Instead:

1. `py-script/fetch_news.py` pulls headlines with a secret API key.
2. Results merge into rolling JSON caches under `public/data/`.
3. Vite ships those files with the static site.

## Script

```bash
python py-script/fetch_news.py <News_API_KEY>
```

Dependencies: [`py-script/requirements.txt`](../py-script/requirements.txt) (`requests`).

### Behavior

- Writes to `./public/data/`
- One `everything` request → `everything-en-news.json`
- Fourteen `top-headlines` requests → `{in|us}-en-{category}.json` for seven categories
- Dedupes by URL (title fallback)
- Prefers the last **7 days**, keeps **min 100 / max 1000** articles when possible
- Newest articles first
- Payload shape matches NewsAPI: `{ status, totalResults, articles }`

### Categories / countries

Mirrored in both Python and [`src/config.js`](../src/config.js):

- Countries: `in`, `us`
- Categories: business, entertainment, general, health, science, sports, technology

## Frontend consumption

`useNewsFeed` loads the matching file once per `category` + `country` change, filters `[removed]` titles, and surfaces loading / error / empty states.

## Secrets

GitHub Actions uses repository secret `News_API_KEY`. Never commit API keys or `.env` files with secrets.
