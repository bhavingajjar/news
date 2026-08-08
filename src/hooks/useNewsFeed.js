import { useEffect, useState } from 'react'
import { getNewsDataUrl } from '../lib/dataUrl'

/**
 * Load a static NewsAPI-shaped JSON feed for home or category views.
 */
export function useNewsFeed({ category = null, country, enabled = true }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(Boolean(enabled))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      setArticles([])
      setError('')
      return undefined
    }

    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError('')
      setArticles([])

      try {
        const response = await fetch(getNewsDataUrl(category, country), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load news (${response.status})`)
        }

        const payload = await response.json()
        const nextArticles = Array.isArray(payload.articles)
          ? payload.articles.filter(
              (article) =>
                article?.title &&
                article.title.toLowerCase() !== '[removed]',
            )
          : []

        setArticles(nextArticles)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Unable to load news right now.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    load()
    window.scrollTo({ top: 0, behavior: 'smooth' })

    return () => controller.abort()
  }, [category, country, enabled])

  return { articles, loading, error }
}
