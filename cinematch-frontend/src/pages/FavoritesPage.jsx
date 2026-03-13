import { useState, useEffect } from 'react'
import { getSavedMovies, deleteMovieFromDB } from '../services/movieService'
import { useNavigate } from 'react-router-dom'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

const Stars = ({ n }) => {
  const filled = Math.round(n)             // n already 0-5
  return (
    <span className="fav-stars">
      {'★'.repeat(filled)}{'☆'.repeat(5 - filled)}
    </span>
  )
}

// 1. Add onFavoritesChange to props
export default function FavoritesPage({ refreshKey, onFavoritesChange }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getSavedMovies().then(data => {
      setMovies(data)
      setLoading(false)
    })
  }, [refreshKey])

  // 2. Create the DELETE function
  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from your favorites? 💔`)) {
      const success = await deleteMovieFromDB(id);
      if (success) {
        // Remove the movie from the visual list
        setMovies(prev => prev.filter(m => m.id !== id));
        //  Notify the Navbar that the number of favorites went down
        if (onFavoritesChange) onFavoritesChange();
      } else {
        alert("We were unable to remove the movie. Please try again.");
      }
    }
  };

  if (loading) return (
    <div className="fav-page">
      <div className="fav-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="fav-card skeleton-fav">
            <div className="sk-poster-sm" />
            <div className="fav-card-info">
              <div className="sk-bar wide" />
              <div className="sk-bar narrow" style={{ marginTop: 6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (movies.length === 0) return (
    <div className="fav-page">
      <div className="empty-swipe">
        <span className="es-icon">💔</span>
        <h2>No favorites yet</h2>
        <p>Go to Discover and start liking movies!</p>
        <button className="btn-reload" onClick={() => navigate('/')}>
          🎬 Discover Movies
        </button>
      </div>
    </div>
  )

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h2 className="fav-title">❤️ My Favorites</h2>
        <span className="fav-count">{movies.length} saved</span>
      </div>
      <div className="fav-grid">
        {movies.map(movie => (
          <div key={movie.id} className="fav-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="fav-poster">
              <img
                src={`${IMG_BASE}${movie.posterPath}`}
                alt={movie.title}
                loading="lazy"
              />
            </div>
            <div className="fav-card-info" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p className="fav-card-title">{movie.title}</p>
                <div className="fav-card-meta">
                  <Stars n={movie.personalRating} />
                  <span className="fav-score">{movie.personalRating}/5</span>
                </div>
              </div>

              {/* 🔥 3. ADD THE DELETE BUTTON 🔥 */}
              <button
                onClick={() => handleDelete(movie.id, movie.title)}
                style={{
                  marginTop: '15px',
                  padding: '8px',
                  backgroundColor: 'transparent',
                  color: '#e50914',
                  border: '1px solid #e50914',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%',
                  transition: '0.2s'
                }}
                onMouseOver={(e) => { e.target.style.backgroundColor = '#e50914'; e.target.style.color = 'white'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#e50914'; }}
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}