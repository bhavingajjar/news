export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Top News'

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || 'https://bhavingajjar.github.io/news'

export const CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
]

export const COUNTRIES = [
  { code: 'in', label: 'India' },
  { code: 'us', label: 'United States' },
]

export const LANGUAGE = 'en'

export function capitalize(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function isValidCategory(value) {
  return CATEGORIES.includes(value)
}
