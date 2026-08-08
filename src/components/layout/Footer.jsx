import { Link } from 'react-router-dom'
import { APP_NAME } from '../../config'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <p>
          Built with React 19 ·{' '}
          <Link className="font-medium text-ink underline-offset-2 hover:underline" to="/">
            Home
          </Link>
        </p>
      </div>
    </footer>
  )
}
