import { useFavorites } from '../contexts/favorites-context'
import type { PokemonSummary } from '../types/pokemon'

type PokemonCardProps = {
  pokemon: PokemonSummary
  onSelect: (id: number) => void
}

function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(pokemon.id)

  return (
    <li className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <button
        type="button"
        onClick={() => toggleFavorite(pokemon)}
        aria-label={favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        className="absolute right-3 top-3 z-10 text-xl"
      >
        {favorite ? '❤️' : '🤍'}
      </button>

      <button
        type="button"
        onClick={() => onSelect(pokemon.id)}
        className="flex w-full flex-col items-center gap-2"
      >
        <img src={pokemon.imageUrl} alt={pokemon.name} loading="lazy" className="h-24 w-24 object-contain" />
        <span className="text-xs text-gray-400">#{String(pokemon.id).padStart(4, '0')}</span>
        <span className="font-semibold capitalize">{pokemon.name}</span>
      </button>
    </li>
  )
}

export default PokemonCard