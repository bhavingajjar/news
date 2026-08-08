import { LANGUAGE } from '../config'

/**
 * Resolve a static news JSON URL relative to the Vite base path.
 * Home feed uses everything; category feeds are scoped by country.
 */
export function getNewsDataUrl(category, country) {
  const base = import.meta.env.BASE_URL
  const file = category
    ? `${country}-${LANGUAGE}-${category}.json`
    : `everything-${LANGUAGE}-news.json`

  return `${base}data/${file}`
}

export function formatPublishedAt(value) {
  if (!value) return 'Unknown date'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Unknown date'

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}
