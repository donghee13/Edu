import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { PokemonSummary } from '../types/pokemon'
import { FavoritesContext } from './favorites-context'

function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<PokemonSummary[]>('pokedex:favorites', [])

  const isFavorite = (id: number) => favorites.some((p) => p.id === id)

  const toggleFavorite = (pokemon: PokemonSummary) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id) // 이미 있으면 빼기
        : [...prev, pokemon],                     // 없으면 넣기
    )
  }

  return (
    <FavoritesContext value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext>
  )
}

export default FavoritesProvider