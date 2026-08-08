import { Navigate, useParams } from 'react-router-dom'
import {
  APP_NAME,
  SITE_URL,
  capitalize,
  isValidCategory,
} from '../config'
import { PageMeta } from '../components/seo/PageMeta'
import { NewsFeed } from '../components/news/NewsFeed'
import { useCountry } from '../context/country-context'
import { useNewsFeed } from '../hooks/useNewsFeed'

export function CategoryPage() {
  const { category } = useParams()
  const valid = isValidCategory(category)
  const { country, countries } = useCountry()
  const { articles, loading, error } = useNewsFeed({
    category,
    country,
    enabled: valid,
  })

  if (!valid) {
    return <Navigate to="/404" replace />
  }

  const countryLabel =
    countries.find((item) => item.code === country)?.label || country.toUpperCase()
  const title = `${countryLabel} · ${capitalize(category)}`
  const description = `Top ${category} headlines for ${countryLabel}, refreshed from NewsAPI on a rolling schedule.`
  const path = `/${category}`

  return (
    <>
      <PageMeta
        title={title}
        description={description}
        path={path}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${title} · ${APP_NAME}`,
          url: `${SITE_URL}${path}`,
          description,
          isPartOf: {
            '@type': 'WebSite',
            name: APP_NAME,
            url: SITE_URL,
          },
        }}
      />
      <NewsFeed
        title={`${country.toUpperCase()} — Top ${capitalize(category)} Headlines`}
        subtitle={`Country-scoped ${category} coverage from the static JSON pipeline.`}
        articles={articles}
        loading={loading}
        error={error}
      />
    </>
  )
}
