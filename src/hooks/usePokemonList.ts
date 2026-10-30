import { useEffect, useState } from 'react'
import { getPokemonList } from '../api/pokemon'
import type { PokemonSummary } from '../types/pokemon'
import { toSummary } from '../utils/pokemon'

const PAGE_SIZE = 20

export function usePokemonList(page: number) {
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController() // 요청 취소 리모컨

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getPokemonList(PAGE_SIZE, page * PAGE_SIZE, controller.signal)
        setPokemons(data.results.map(toSummary))
        setTotalCount(data.count)
      } catch (err) {
        if (controller.signal.aborted) return // 우리가 취소한 요청이면 무시
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했어요')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    load()

    // page가 바뀌거나 컴포넌트가 사라지면 진행 중인 요청을 취소
    return () => controller.abort()
  }, [page])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return { pokemons, totalPages, isLoading, error }
}