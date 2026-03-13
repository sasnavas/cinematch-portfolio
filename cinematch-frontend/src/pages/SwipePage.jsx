import { useState, useEffect, useCallback } from 'react'
import { getPopularMovies } from '../services/tmdbService'
import { saveMovieToDB, getSavedMovies } from '../services/movieService'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

export default function SwipePage({ onFavoritesChange }) {
  const [queue, setQueue] = useState([])
  const [seen, setSeen] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [toast, setToast] = useState(null)
  const [action, setAction] = useState(null) // 'like' | 'skip'
  const [page, setPage] = useState(1)
  const [expanded, setExpanded] = useState(false)

  /* ── Load movies ─────────────────────────────────────────── */
  const loadMovies = useCallback(async (pageNum) => {
    const movies = await getPopularMovies(pageNum)
    const saved = await getSavedMovies()
    const savedIds = new Set(saved.map(m => m.tmdbId))

    setQueue(prev => {
      const next = movies.filter(m => !savedIds.has(m.id) && !seen.has(m.id))
      return [...prev, ...next]
    })
    setSeen(prev => {
      const updated = new Set(prev)
      movies.forEach(m => updated.add(m.id))
      return updated
    })
    setLoading(false)
  }, [seen])

  useEffect(() => { loadMovies(1) }, []) // eslint-disable-line

  /* Load more when deck runs low */
  useEffect(() => {
    if (!loading && queue.length < 4) {
      const nextPage = page + 1
      setPage(nextPage)
      loadMovies(nextPage)
    }
  }, [queue.length]) // eslint-disable-line

  /* Auto-hide toast */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  /* ── Handlers ─────────────────────────────────────────────── */
  const advance = (type) => {
    setAction(type)
    setExpanded(false)
    setTimeout(() => {
      setQueue(prev => prev.slice(1))
      setAction(null)
    }, 380)
  }

  const handleLike = async () => {
    const movie = queue[0]
    if (!movie || savingId) return

    setSavingId(movie.id)

    // 1. Build the payload including the new variables for Java
    const payload = {
      tmdbId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      // 👇 The new columns for your Netflix/Tinder design
      overview: movie.overview || '',
      releaseDate: movie.release_date || '',
      // 👆
      personalRating: 5,
      review: "¡Me encanta esta película!"
    }

    // 2. Try to save to Java
    const saved = await saveMovieToDB(payload)

    setSavingId(null)

    // 3. Handle success or failure
    if (saved) {
      setToast({ msg: `❤️ "${saved.title}" saved to favorites!`, ok: true })
      onFavoritesChange?.() // Update the Navbar badge
      advance('like')       // Make the card fly to the right only if it was successful
    } else {
      setToast({ msg: '❌ Could not save. Please try again.', ok: false })
      // If it fails, we don't advance the card so the user can try again
    }
  }

  const handleSkip = () => {
    if (queue.length === 0) return
    advance('skip')
  }

  /* ── Render helpers ───────────────────────────────────────── */
  const current = queue[0]

  if (loading) return <SwipeSkeleton />

  if (!current) return (
    <div className="empty-swipe">
      <span className="es-icon">🎬</span>
      <h2>You've seen everything!</h2>
      <p>No more movies to discover for now. Come back later!</p>
      <button className="btn-reload" onClick={() => { setQueue([]); setSeen(new Set()); setPage(1); setLoading(true); loadMovies(1) }}>
        🔄 Reload Movies
      </button>
    </div>
  )

  return (
    <div className="swipe-page">

      {/* Deck counter */}
      <p className="deck-counter">{queue.length} movie{queue.length !== 1 ? 's' : ''} in queue</p>

      {/* Background stack hint (next 2 cards) */}
      {queue[2] && <div className="stack-card stack-3" />}
      {queue[1] && <div className="stack-card stack-2" />}

      {/* Main card */}
      <div
        key={current.id}
        className={`swipe-card${action === 'like' ? ' fly-right' : action === 'skip' ? ' fly-left' : ' card-enter'}`}
      >
        <img
          className="swipe-poster"
          src={`${IMG_BASE}${current.poster_path}`}
          alt={current.title}
        />

        {/* Gradient overlay with info */}
        <div className="swipe-overlay">
          <div className="swipe-meta">
            <div className="swipe-vote">
              <span className="star">★</span>
              {current.vote_average?.toFixed(1)}
            </div>
            {current.release_date && (
              <span className="swipe-year">{current.release_date.slice(0, 4)}</span>
            )}
          </div>
          <h1 className="swipe-title">{current.title}</h1>

          {/* Synopsis */}
          {current.overview && (
            <div className="swipe-synopsis">
              <p className={`synopsis-text${expanded ? ' expanded' : ''}`}>
                {current.overview}
              </p>
              {current.overview.length > 120 && (
                <button className="synopsis-toggle" onClick={() => setExpanded(e => !e)}>
                  {expanded ? 'Show less ▲' : 'Read more ▼'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="swipe-actions">
        <button
          className="action-btn skip-btn"
          onClick={handleSkip}
          title="Skip"
          aria-label="Skip this movie"
        >
          ✕
        </button>
        <button
          className={`action-btn like-btn${savingId ? ' loading' : ''}`}
          onClick={handleLike}
          disabled={!!savingId}
          title="Like / Save"
          aria-label="Like and save this movie"
        >
          {savingId ? '⏳' : '❤'}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`swipe-toast${toast.ok ? '' : ' error'}`}>{toast.msg}</div>
      )}
    </div>
  )
}

function SwipeSkeleton() {
  return (
    <div className="swipe-page">
      <div className="swipe-card skeleton-card-big">
        <div className="sk-poster" />
        <div className="sk-overlay">
          <div className="sk-bar wide" />
          <div className="sk-bar" />
          <div className="sk-bar narrow" />
        </div>
      </div>
      <div className="swipe-actions">
        <div className="action-btn sk-btn" />
        <div className="action-btn sk-btn" />
      </div>
    </div>
  )
}
