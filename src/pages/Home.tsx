import { useState, useEffect } from 'react'
import type { Movie } from '../types/Movie'
import { getPopularMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard'

function Home() {

    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        async function buscarFilmes() {
            try {
                const filmesPopulares = await getPopularMovies()
                setMovies(filmesPopulares)
            } catch (error) {
                console.error("Erro ao buscar filmes populares:", error)
            }
        }

        buscarFilmes()
    }, [])

    return (
        <div className="row">
            {movies.map((movie) => (
                <div className="col-md-3" key={movie.id}>
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    )
}

export default Home

