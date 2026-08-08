#!/usr/bin/env node
/**
 * After Vite build: write per-route HTML with full SEO head + crawlable article lists.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { APP_NAME } from '../src/config.js'
import {
  OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  PRERENDER_PATHS,
  absoluteUrl,
  getRouteSeo,
} from '../src/lib/seo.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
const MAX_ARTICLES = 40

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function dataFileCandidates(seo) {
  if (!seo.dataFile) return []
  const files = [seo.dataFile]
  // Prefer India category dump; fall back to US if missing.
  if (seo.dataFile.startsWith('in-en-')) {
    files.push(seo.dataFile.replace(/^in-en-/, 'us-en-'))
  }
  return files
}

function resolveDataPath(seo) {
  for (const file of dataFileCandidates(seo)) {
    for (const base of [join(DIST, 'data'), join(ROOT, 'public', 'data')]) {
      const full = join(base, file)
      if (existsSync(full)) return full
    }
  }
  return null
}

function loadArticles(seo) {
  const path = resolveDataPath(seo)
  if (!path) return []
  try {
    const payload = JSON.parse(readFileSync(path, 'utf8'))
    const articles = Array.isArray(payload.articles) ? payload.articles : []
    return articles
      .filter(
        (article) =>
          article?.title &&
          article.title.toLowerCase() !== '[removed]' &&
          article?.url,
      )
      .slice(0, MAX_ARTICLES)
  } catch {
    return []
  }
}

function buildHeadTags(seo) {
  const canonical = absoluteUrl(seo.path === '/404' ? '/404' : seo.path)
  const imageAlt = `${APP_NAME} — news headlines`
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<meta name="googlebot" content="${escapeHtml(seo.robots)}" />`,
    `<meta name="author" content="${escapeHtml(APP_NAME)}" />`,
    `<meta name="theme-color" content="#0b1320" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(APP_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(OG_IMAGE)}" />`,
    `<meta property="og:image:secure_url" content="${escapeHtml(OG_IMAGE)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
  ]

  if (seo.jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`,
    )
  }

  return tags.join('\n    ')
}

function buildRootHtml(seo, articles) {
  const heading = escapeHtml(seo.heading)
  if (seo.path === '/404') {
    return `<main><h1>${heading}</h1><p>${escapeHtml(seo.description)}</p><p><a href="${escapeHtml(absoluteUrl('/'))}">Go home</a></p></main>`
  }

  const listTag = seo.path === '/' ? 'ol' : 'ul'
  const items = articles
    .map((article) => {
      const title = escapeHtml(article.title)
      const href = escapeHtml(article.url)
      return `<li><a href="${href}" rel="noopener noreferrer">${title}</a></li>`
    })
    .join('')

  const list =
    items.length > 0
      ? `<${listTag}>${items}</${listTag}>`
      : '<p>Headlines load when JavaScript is available.</p>'

  return `<main><h1>${heading}</h1>${list}</main>`
}

function stripManagedHeadTags(html) {
  return html
    .replace(/<title>[^<]*<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="robots"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="googlebot"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="author"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="theme-color"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, '')
    .replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
      '',
    )
}

function injectHtml(template, seo, articles) {
  let html = stripManagedHeadTags(template)
  const headBlock = buildHeadTags(seo)
  html = html.replace(/<\/head>/i, `    ${headBlock}\n  </head>`)

  const rootInner = buildRootHtml(seo, articles)
  if (/<div id="root"><\/div>/i.test(html)) {
    html = html.replace(
      /<div id="root"><\/div>/i,
      `<div id="root">${rootInner}</div>`,
    )
  } else if (/<div id="root">[\s\S]*?<\/div>/i.test(html)) {
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>/i,
      `<div id="root">${rootInner}</div>`,
    )
  } else {
    throw new Error('Could not find #root in dist/index.html')
  }

  return html
}

function outputPathFor(path) {
  if (path === '/' || path === '') return join(DIST, 'index.html')
  if (path === '/404') return join(DIST, '404.html')
  const category = path.replace(/^\//, '')
  return join(DIST, category, 'index.html')
}

function main() {
  const templatePath = join(DIST, 'index.html')
  if (!existsSync(templatePath)) {
    console.error('seo-prerender: dist/index.html missing — run vite build first')
    process.exit(1)
  }

  const template = readFileSync(templatePath, 'utf8')

  for (const path of PRERENDER_PATHS) {
    const seo = getRouteSeo(path)
    const articles = loadArticles(seo)
    const html = injectHtml(template, seo, articles)
    const out = outputPathFor(path)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, html, 'utf8')
    console.log(
      `seo-prerender: wrote ${out.replace(ROOT + '/', '')} (${articles.length} links)`,
    )
  }
}

main()
