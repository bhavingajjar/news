import { Navigate, useParams } from 'react-router-dom'
import { capitalize, isValidCategory } from '../config'
import { PageMeta } from '../components/seo/PageMeta'
import { NewsFeed } from '../components/news/NewsFeed'
import { useCountry } from '../context/country-context'
import { useNewsFeed } from '../hooks/useNewsFeed'
import { getRouteSeo } from '../lib/seo'

export function CategoryPage() {
  const { category } = useParams()
  const valid = isValidCategory(category)
  const { country } = useCountry()
  const { articles, loading, error } = useNewsFeed({
    category,
    country,
    enabled: valid,
  })

  if (!valid) {
    return <Navigate to="/404" replace />
  }

  const seo = getRouteSeo(`/${category}`)

  return (
    <>
      <PageMeta
        title={seo.title}
        description={seo.description}
        path={seo.path}
        robots={seo.robots}
        jsonLd={seo.jsonLd}
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
