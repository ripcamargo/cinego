import type { Movie } from "../types/Movie"
import { Link } from 'react-router-dom'
import noPosterImage from '../assets/no-poster.png'

interface Props {
    movie: Movie
}

function MovieCard({ movie }: Props) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : noPosterImage
    
    return (
        <Link to={`/movie/${movie.id}`} className="text-decoration-none text-dark">
            <div className="card h-100">
                <img src={posterUrl} className="card-img-top" alt={movie.title} />
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <span className="rating-badge">⭐ {movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard