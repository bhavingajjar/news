import noImage from '../../assets/no-image.png'
import { formatPublishedAt } from '../../lib/dataUrl'

export function ArticleCard({ article }) {
  const {
    title,
    description,
    urlToImage,
    url,
    author,
    publishedAt,
    source,
  } = article

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_-20px_rgba(11,19,32,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(11,19,32,0.55)]">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden bg-mist"
      >
        <img
          src={urlToImage || noImage}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = noImage
          }}
        />
        {source?.name ? (
          <span className="absolute right-3 top-3 rounded-md bg-signal px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {source.name}
          </span>
        ) : null}
      </a>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h2 className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-signal"
          >
            {title}
          </a>
        </h2>

        {description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-slate">
            {description}
          </p>
        ) : null}

        <div className="mt-auto space-y-1 text-xs text-slate">
          <p>
            <span className="font-semibold text-ink-soft">Author:</span>{' '}
            {author || 'Anonymous'}
          </p>
          <p>
            <span className="font-semibold text-ink-soft">Published:</span>{' '}
            <time dateTime={publishedAt}>{formatPublishedAt(publishedAt)}</time>
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white transition hover:bg-signal"
        >
          Read more
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}
