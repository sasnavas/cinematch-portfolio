import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { getSavedMovies } from './services/movieService'
import SwipePage from './pages/SwipePage'
import FavoritesPage from './pages/FavoritesPage'
import './App.css'

export default function App() {
  const [favCount, setFavCount] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  /* Load initial favorites count */
  useEffect(() => {
    getSavedMovies().then(data => setFavCount(data.length))
  }, [])

  const handleFavoritesChange = () => {
    getSavedMovies().then(data => {
      setFavCount(data.length)
      setRefreshKey(k => k + 1)
    })
  }

  return (
    <BrowserRouter>
      <div className="app-shell">

        {/* ── Navbar ───────────────────────────────────────── */}
        <nav className="navbar">
          <div className="navbar-logo">
            <div className="logo-icon">C</div>
            <span className="logo-text">Cine<span>Match</span></span>
          </div>

          <div className="nav-tabs">
            <NavLink to="/" end className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}>
              🎬 Discover
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}>
              ❤️ Favorites
              {favCount > 0 && <span className="tab-badge">{favCount}</span>}
            </NavLink>
          </div>
        </nav>

        {/* ── Routes ───────────────────────────────────────── */}
        <main className="content">
          <Routes>
            <Route path="/" element={<SwipePage onFavoritesChange={handleFavoritesChange} />} />
            <Route path="/favorites" element={<FavoritesPage refreshKey={refreshKey} onFavoritesChange={handleFavoritesChange} />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}