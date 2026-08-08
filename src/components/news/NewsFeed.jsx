import { ArticleCard } from './ArticleCard'
import { FeedSkeleton } from './FeedSkeleton'

export function NewsFeed({ title, subtitle, articles, loading, error }) {
  return (
    <section aria-busy={loading} aria-live="polite">
      <header className="mb-6 max-w-3xl sm:mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
          Latest coverage
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-base text-slate sm:text-lg">{subtitle}</p>
        ) : null}
      </header>

      {loading ? <FeedSkeleton /> : null}

      {!loading && error ? (
        <div
          role="alert"
          className="rounded-xl border border-signal/30 bg-signal/5 px-4 py-5 text-signal-dark"
        >
          <p className="font-semibold">Could not load this feed</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      ) : null}

      {!loading && !error && articles.length === 0 ? (
        <p className="rounded-xl border border-line bg-white px-4 py-8 text-center text-slate">
          No articles available right now. Check back after the next data refresh.
        </p>
      ) : null}

      {!loading && !error && articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard
              key={`${article.url || article.title}-${index}`}
              article={article}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
