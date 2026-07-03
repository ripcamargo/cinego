import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Movie } from '../types/Movie'

interface FavoritesContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  function addFavorite(movie: Movie) {
    setFavorites((prev) => [...prev, movie])
  }

  function removeFavorite(id: number) {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id))
  }

  function isFavorite(id: number) {
    return favorites.some((movie) => movie.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites precisa ser usado dentro de um FavoritesProvider')
  }
  return context
}