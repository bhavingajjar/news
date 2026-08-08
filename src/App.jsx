import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Shell } from './components/layout/Shell'
import { CategoryPage } from './pages/CategoryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <Shell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </HelmetProvider>
  )
}
