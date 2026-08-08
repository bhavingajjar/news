import { useLocation } from 'react-router-dom'
import { isValidCategory } from '../../config'
import { CountryProvider } from '../../context/CountryProvider'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollTop } from './ScrollTop'

export function Shell({ children }) {
  const { pathname } = useLocation()
  const segment = pathname.replace(/^\//, '').split('/')[0]
  const showCountrySelector = isValidCategory(segment)

  return (
    <CountryProvider>
      <div className="flex min-h-screen flex-col">
        <Header showCountrySelector={showCountrySelector} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
        <Footer />
        <ScrollTop />
      </div>
    </CountryProvider>
  )
}
