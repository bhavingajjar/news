# Top News

Mobile-friendly news reader built with **React 19**, **Vite**, and **Tailwind CSS**. Headlines are served from a rolling static JSON cache updated by NewsAPI via GitHub Actions.

**Live:** https://bhavingajjar.github.io/news/

## Features

- Home feed plus seven category routes
- India / United States country filter (persisted)
- Tailwind editorial UI with responsive layout
- Per-route SEO meta, sitemap, robots, JSON-LD
- Scheduled data refresh every six hours

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Open the printed local URL under the `/news/` base path.

## Documentation

Full workflow notes live in [`docs/`](./docs/README.md):

- [Architecture](./docs/architecture.md)
- [Data pipeline](./docs/data-pipeline.md)
- [Workflows](./docs/workflows.md)
- [SEO](./docs/seo.md)
- [Local development](./docs/local-development.md)

## Deploy

Pushes to `main` build and publish via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). Set Pages source to **GitHub Actions** and add the `News_API_KEY` secret for the fetch workflow.
