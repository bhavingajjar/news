import { createContext, useContext } from 'react'

export const CountryContext = createContext(null)

export function useCountry() {
  const value = useContext(CountryContext)
  if (!value) {
    throw new Error('useCountry must be used within CountryProvider')
  }
  return value
}
