import { useState } from 'react'
import Pagination from './components/pagination'
import PokemonList from './components/PokemonList'
import { usePokemonList } from './hooks/usePokemonList'
import PokemonDetail from './components/PokemonDetail'

function App() {
  const [page, setPage] = useState(0)
  const { pokemons, totalPages, isLoading, error } = usePokemonList(page)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  console.log(selectedId)

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">포켓몬 도감</h1>

      {isLoading && <p className="py-20 text-center text-gray-500">불러오는 중... ⏳</p>}
      {error && <p className="py-20 text-center text-red-500">😢 {error}</p>}
      {!isLoading && !error && (
        <PokemonList pokemons={pokemons} onSelect={setSelectedId} />
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      {selectedId !== null && (
        <PokemonDetail id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </main>
  )
}

export default App