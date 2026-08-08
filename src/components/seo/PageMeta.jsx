import { Helmet } from 'react-helmet-async'
import { APP_NAME, SITE_URL } from '../../config'

/**
 * Per-route document head for SPA SEO and social previews.
 */
export function PageMeta({
  title,
  description,
  path = '/',
  type = 'website',
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} · ${APP_NAME}` : APP_NAME
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`
  const image = `${SITE_URL}/og-default.svg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  )
}
