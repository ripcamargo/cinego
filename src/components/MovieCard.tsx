import type { Movie } from "../types/Movie"

interface Props {
  movie: Movie
}

function MovieCard({ movie }: Props) {
  return (
    <div className="card">
  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
  <div className="card-body">
    <h5 className="card-title">{movie.title}</h5>
    <p className="card-text">{movie.vote_average}</p>
  </div>
</div>
  )
}

export default MovieCard