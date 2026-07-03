import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { MovieDetail as MovieDetailType } from '../types/Movie'
import { getMovieById } from '../services/tmdb'
import { useFavorites } from '../contexts/FavoritesContext'

function MovieDetail() {
    const { id } = useParams()
    const [movie, setMovie] = useState<MovieDetailType | null>(null)

    const navigate = useNavigate()
    const { addFavorite, removeFavorite, isFavorite } = useFavorites()

    function handleVoltar() {
        navigate(-1)
    }



    useEffect(() => {
        async function fetchMovie() {
            if (id) {
                try {
                    const filme = await getMovieById(id)
                    setMovie(filme)
                } catch (error) {
                    console.error("Erro ao buscar detalhes do filme:", error)
                }
            }
        }

        fetchMovie()
    }, [id])

    return (
        <div className="container">
            <button className="btn-favorite mb-3" onClick={handleVoltar}>
                Voltar
            </button>

            {movie && (
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="img-fluid rounded"
                        />
                    </div>

                    <div className="col-md-8">
                        <h1>{movie.title}</h1>
                        <p>{movie.genres.map((genero) => genero.name).join(', ')}</p>
                        <p>{movie.vote_average}</p>
                        <p>{movie.overview}</p>

                        {isFavorite(movie.id) ? (
                            <button className="btn-favorite" onClick={() => removeFavorite(movie.id)}>
                                Remover dos favoritos
                            </button>
                        ) : (
                            <button className="btn-favorite" onClick={() => addFavorite(movie)}>
                                Adicionar aos favoritos
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieDetail




