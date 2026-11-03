import { usePokemon } from '../hooks/usePokemon'

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  'special-attack': '특수공격',
  'special-defense': '특수방어',
  speed: '스피드',
}

type PokemonDetailProps = {
  id: number
  onClose: () => void
}

function PokemonDetail({ id, onClose }: PokemonDetailProps) {
  const { pokemon, koreanName, isLoading, error } = usePokemon(id)
  console.log(pokemon, koreanName, isLoading, error)

  return (
    // 바깥(어두운 배경)을 누르면 닫기
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      {/* 안쪽을 누를 때는 닫히지 않도록 클릭 전파를 막음 */}
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {isLoading && <p className="py-10 text-center text-gray-500">불러오는 중... ⏳</p>}
        {error && <p className="py-10 text-center text-red-500">😢 {error}</p>}

        {!isLoading && pokemon && (
          <>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default ?? pokemon.sprites.front_default ?? undefined}
              alt={pokemon.name}
              className="mx-auto h-40 w-40 object-contain"
            />
            <p className="text-center text-sm text-gray-400">#{String(pokemon.id).padStart(4, '0')}</p>
            <h2 className="text-center text-2xl font-bold capitalize">
              {koreanName} <span className="text-lg text-gray-400 font-normal">({pokemon.name})</span>
            </h2>

            <div className="mt-3 flex justify-center gap-2">
              {pokemon.types.map(({ type }) => (
                <span key={type.name} className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize">
                  {type.name}
                </span>
              ))}
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              키 {pokemon.height / 10}m · 몸무게 {pokemon.weight / 10}kg
            </p>

            <ul className="mt-4 space-y-2">
              {pokemon.stats.map(({ base_stat, stat }) => (
                <li key={stat.name} className="flex items-center gap-2 text-sm">
                  <span className="w-20 shrink-0 text-gray-500">{STAT_LABELS[stat.name] ?? stat.name}</span>
                  <span className="w-8 text-right font-semibold">{base_stat}</span>
                  <div className="h-2 flex-1 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${Math.min(base_stat / 150, 1) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-gray-900 py-2 text-sm font-medium text-white"
        >
          닫기
        </button>
      </div>
    </div>
  )
}

export default PokemonDetail