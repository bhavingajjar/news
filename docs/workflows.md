# Workflows

## `fetch_news.yml`

**Triggers**

- Cron every 6 hours
- Manual `workflow_dispatch`
- Push to `main` when the fetch script, requirements, or this workflow change

**Steps**

1. Checkout
2. Python 3.12 + `pip install -r py-script/requirements.txt`
3. Run `python py-script/fetch_news.py ${{ secrets.News_API_KEY }}`
4. Commit and push only `public/data/` when files changed

Path filters prevent a data commit from re-running the fetch workflow.

## `deploy.yml`

**Triggers**

- Push to `main` (ignores docs / markdown / fetch-only paths)
- Manual `workflow_dispatch`

**Steps**

1. `npm ci` on **Node.js 24**
2. `npm run build` with `VITE_APP_NAME` and `VITE_SITE_URL`
   - Runs `vite build` then `node scripts/seo-prerender.mjs`
   - Prerender writes `dist/index.html`, `dist/{category}/index.html`, and `dist/404.html`
3. Upload `dist/` as a Pages artifact
4. Deploy with `actions/deploy-pages`

## One-time GitHub setup

1. Add secret `News_API_KEY` (NewsAPI.org key).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Ensure the default branch is `main`.

## Live URL

https://bhavingajjar.github.io/news/
