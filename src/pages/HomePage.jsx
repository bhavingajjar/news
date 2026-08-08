import { APP_NAME, SITE_URL } from '../config'
import { PageMeta } from '../components/seo/PageMeta'
import { NewsFeed } from '../components/news/NewsFeed'
import { useCountry } from '../context/country-context'
import { useNewsFeed } from '../hooks/useNewsFeed'

export function HomePage() {
  const { country } = useCountry()
  const { articles, loading, error } = useNewsFeed({ category: null, country })

  const description =
    'Top English news headlines aggregated from NewsAPI into a rolling static cache.'

  return (
    <>
      <PageMeta
        title="Top Headlines"
        description={description}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: APP_NAME,
          url: SITE_URL,
          description,
        }}
      />
      <NewsFeed
        title="Top News Headlines"
        subtitle="Fresh English coverage from the rolling cache — updated every six hours."
        articles={articles}
        loading={loading}
        error={error}
      />
    </>
  )
}
