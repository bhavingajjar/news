import { PageMeta } from '../components/seo/PageMeta'
import { NewsFeed } from '../components/news/NewsFeed'
import { useCountry } from '../context/country-context'
import { useNewsFeed } from '../hooks/useNewsFeed'
import { getRouteSeo } from '../lib/seo'

export function HomePage() {
  const { country } = useCountry()
  const { articles, loading, error } = useNewsFeed({ category: null, country })
  const seo = getRouteSeo('/')

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
        title={seo.heading}
        subtitle="Fresh English coverage from the rolling cache — updated every six hours."
        articles={articles}
        loading={loading}
        error={error}
      />
    </>
  )
}
