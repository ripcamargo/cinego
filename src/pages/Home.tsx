import { useState, useEffect } from 'react'
import type { Movie } from '../types/Movie'
import { getPopularMovies, searchMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard'


function Home() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [query, setQuery] = useState('')


    useEffect(() => {
        async function buscar() {
            try {
                if (query === '') {
                    const filmesPopulares = await getPopularMovies()
                    setMovies(filmesPopulares)
                } else {
                    const resultadosBusca = await searchMovies(query)
                    setMovies(resultadosBusca)
                }
            } catch (error) {
                console.error("Erro ao buscar filmes:", error)
            }
        }

        buscar()
    }, [query])

    return (
        <div className="container mt-4">

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar filme..."
                className="form-control mb-4"
            />
            <div className="row">
                {movies.map((movie) => (
                    <div className="col-md-3" key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home

