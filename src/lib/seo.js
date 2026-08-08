import { APP_NAME, CATEGORIES, SITE_URL, capitalize } from '../config.js'

export const OG_IMAGE = `${SITE_URL}/og-default.png`
export const OG_IMAGE_WIDTH = '1536'
export const OG_IMAGE_HEIGHT = '1024'
export const DEFAULT_DESCRIPTION =
  'Top News — mobile-friendly headlines with category and country filters, backed by a rolling NewsAPI cache.'

/**
 * Shared route SEO definitions used by the React app and the build-time prerender script.
 */
export function getRouteSeo(path = '/') {
  if (path === '/' || path === '') {
    return {
      path: '/',
      title: `Top Headlines · ${APP_NAME}`,
      description: DEFAULT_DESCRIPTION,
      robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      dataFile: 'everything-en-news.json',
      heading: 'Top News Headlines',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: APP_NAME,
        url: SITE_URL,
        description: DEFAULT_DESCRIPTION,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    }
  }

  if (path === '/404') {
    return {
      path: '/404',
      title: `Page not found · ${APP_NAME}`,
      description: 'The page you requested does not exist.',
      robots: 'noindex,follow',
      dataFile: null,
      heading: 'Page not found',
      jsonLd: null,
    }
  }

  const category = path.replace(/^\//, '')
  if (CATEGORIES.includes(category)) {
    const label = capitalize(category)
    const description = `Top ${category} headlines from India and the United States, refreshed from NewsAPI on a rolling schedule.`
    return {
      path: `/${category}`,
      title: `${label} Headlines · ${APP_NAME}`,
      description,
      robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      dataFile: `in-en-${category}.json`,
      heading: `Top ${label} Headlines`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${label} Headlines · ${APP_NAME}`,
        url: `${SITE_URL}/${category}`,
        description,
        isPartOf: {
          '@type': 'WebSite',
          name: APP_NAME,
          url: SITE_URL,
        },
      },
    }
  }

  return getRouteSeo('/404')
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const PRERENDER_PATHS = ['/', ...CATEGORIES.map((c) => `/${c}`), '/404']
