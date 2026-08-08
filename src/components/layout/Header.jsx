import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { APP_NAME, CATEGORIES, capitalize } from '../../config'
import { useCountry } from '../../context/country-context'

export function Header({ showCountrySelector }) {
  const { country, setCountry, countries } = useCountry()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ink/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          {APP_NAME}
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Categories">
          {CATEGORIES.map((category) => (
            <NavLink
              key={category}
              to={`/${category}`}
              className={({ isActive }) =>
                [
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/75 hover:bg-white/10 hover:text-white',
                ].join(' ')
              }
            >
              {capitalize(category)}
            </NavLink>
          ))}
        </nav>

        {showCountrySelector ? (
          <label className="ml-2 hidden items-center gap-2 text-sm text-white/80 lg:flex">
            <span className="sr-only">Country</span>
            <select
              className="rounded-md border border-white/20 bg-ink-soft px-2 py-2 text-sm text-white outline-none focus:border-signal"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              aria-label="Select country"
            >
              {countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <div id="mobile-nav" className="border-t border-white/10 px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile categories">
            {CATEGORIES.map((category) => (
              <NavLink
                key={category}
                to={`/${category}`}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-3 text-base font-medium',
                    isActive ? 'bg-white/15 text-white' : 'text-white/80',
                  ].join(' ')
                }
              >
                {capitalize(category)}
              </NavLink>
            ))}
          </nav>

          {showCountrySelector ? (
            <label className="mt-3 flex flex-col gap-2 text-sm text-white/80">
              <span>Country</span>
              <select
                className="rounded-md border border-white/20 bg-ink-soft px-3 py-3 text-base text-white"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                {countries.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      ) : null}

      <div className="scrollbar-none flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-2 lg:hidden">
        {CATEGORIES.map((category) => (
          <NavLink
            key={category}
            to={`/${category}`}
            className={({ isActive }) =>
              [
                'shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide',
                isActive
                  ? 'bg-signal text-white'
                  : 'bg-white/10 text-white/80',
              ].join(' ')
            }
          >
            {capitalize(category)}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
