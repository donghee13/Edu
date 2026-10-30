import type { PokemonSummary } from '../types/pokemon'
import PokemonCard from './PokemonCard'

type PokemonListProps = {
  pokemons: PokemonSummary[]
  onSelect: (id: number) => void
}

function PokemonList({ pokemons, onSelect }: PokemonListProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={onSelect} />
      ))}
    </ul>
  )
}

export default PokemonList