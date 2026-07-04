import { useFavorites } from '../contexts/FavoritesContext'
import MovieCard from '../components/MovieCard'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="container mt-4">
      <h1>Meus Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Você ainda não tem filmes favoritos.</p>
      ) : (
        <div className="row">
          {favorites.map((movie) => (
            <div className="col-md-3 d-flex mb-4" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites