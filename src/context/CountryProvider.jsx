import { useEffect, useState } from 'react'
import { COUNTRIES } from '../config'
import { CountryContext } from './country-context'

const STORAGE_KEY = 'news-country'

export function CountryProvider({ children }) {
  const [country, setCountry] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const valid = COUNTRIES.some((item) => item.code === stored)
    return valid ? stored : 'in'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, country)
  }, [country])

  return (
    <CountryContext.Provider value={{ country, setCountry, countries: COUNTRIES }}>
      {children}
    </CountryContext.Provider>
  )
}
