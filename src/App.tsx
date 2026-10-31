import { useState } from 'react'
import Pagination from './components/pagination'
import PokemonDetail from './components/PokemonDetail'
import PokemonList from './components/PokemonList'
import { useFavorites } from './contexts/favorites-context'
import { useLocalStorage } from './hooks/useLocalStorage'
import { usePokemonList } from './hooks/usePokemonList'

type Tab = 'all' | 'favorites'

function App() {
  const [page, setPage] = useLocalStorage('pokedex:page', 0)
  const [tab, setTab] = useState<Tab>('all')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const { pokemons, totalPages, isLoading, error } = usePokemonList(page)
  const { favorites } = useFavorites()

  const tabClass = (value: Tab) =>
    `rounded-full px-4 py-2 text-sm font-medium${
      tab === value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
    }`

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">포켓몬 도감</h1>

      <div className="mb-6 flex gap-2">
        <button type="button" className={tabClass('all')} onClick={() => setTab('all')}>
          전체
        </button>
        <button type="button" className={tabClass('favorites')} onClick={() => setTab('favorites')}>
          즐겨찾기 ({favorites.length})
        </button>
      </div>

      {tab === 'all' && (
        <>
          {isLoading && <p className="py-20 text-center text-gray-500">불러오는 중... ⏳</p>}
          {error && <p className="py-20 text-center text-red-500">😢 {error}</p>}
          {!isLoading && !error && <PokemonList pokemons={pokemons} onSelect={setSelectedId} />}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      {tab === 'favorites' &&
        (favorites.length === 0 ? (
          <p className="py-20 text-center text-gray-500">아직 즐겨찾기한 포켓몬이 없어요 🤍</p>
        ) : (
          <PokemonList pokemons={favorites} onSelect={setSelectedId} />
        ))}

      {selectedId !== null && <PokemonDetail id={selectedId} onClose={() => setSelectedId(null)} />}
    </main>
  )
}

export default App