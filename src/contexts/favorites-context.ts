import { createContext, useContext } from 'react'
import type { PokemonSummary } from '../types/pokemon'

export type FavoritesContextValue = {
  favorites: PokemonSummary[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (pokemon: PokemonSummary) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites는 FavoritesProvider 안에서만 사용할 수 있어요')
  }
  return context
}