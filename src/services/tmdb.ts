const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export async function getPopularMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
    const res = await fetch(url)
    if (!res.ok) {
    throw new Error("Erro ao buscar filmes populares")
  }
  const data = await res.json()
    return data.results 
}