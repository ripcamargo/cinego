import type { Movie, MovieDetail } from "../types/Movie"


const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export async function getPopularMovies(): Promise<Movie[]> {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
    const res = await fetch(url)
    if (!res.ok) {
    throw new Error("Erro ao buscar filmes populares")
  }
  const data = await res.json()
    return data.results 
}

export async function searchMovies(query: string): Promise<Movie[]> {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&page=1&query=${encodeURIComponent(query)}`
    const res = await fetch(url)
    if (!res.ok) {
    throw new Error("Erro ao buscar filmes")
  }
  const data = await res.json()
    return data.results 
}

export async function getMovieById(id: string): Promise<MovieDetail> {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    const res = await fetch(url)
    if (!res.ok) {
    throw new Error("Erro ao buscar detalhes do filme")
  }
  const data = await res.json()
    return data 
}