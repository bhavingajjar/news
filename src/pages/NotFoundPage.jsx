import { Link } from 'react-router-dom'
import { PageMeta } from '../components/seo/PageMeta'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page not found"
        description="The page you requested does not exist."
        path="/404"
      />
      <section className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-signal">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">
          Page not found
        </h1>
        <p className="mt-3 text-slate">
          That route is not part of this news reader. Head back to the latest headlines.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-signal"
        >
          Go home
        </Link>
      </section>
    </>
  )
}
