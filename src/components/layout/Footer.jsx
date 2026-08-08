import { Link } from 'react-router-dom'
import { APP_NAME } from '../../config'

export function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ink/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-3 text-center text-sm text-white/80 sm:flex-row sm:gap-2 sm:px-6">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <p className="hidden sm:inline" aria-hidden="true">
          ·
        </p>
        <p>
          Built with React 19 ·{' '}
          <Link className="font-medium text-white underline-offset-2 hover:underline" to="/">
            Home
          </Link>
        </p>
      </div>
    </footer>
  )
}
