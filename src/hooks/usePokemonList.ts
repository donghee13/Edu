import { useEffect, useState } from 'react'
import { getPokemonList, getPokemonSpecies } from '../api/pokemon' // ✅ getPokemonSpecies 추가
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
        // 1. 영어 이름이 담긴 기본 20마리 목록 가져오기
        const data = await getPokemonList(PAGE_SIZE, page * PAGE_SIZE, controller.signal)
        const basicSummaries = data.results.map(toSummary)

        // 2. 20마리의 종(species) 정보를 동시에 추가로 요청하기
        const speciesPromises = basicSummaries.map((p) => getPokemonSpecies(p.id, controller.signal))
        const speciesResults = await Promise.all(speciesPromises)

        // 3. 원래 데이터에 한국어 이름 합치기
        const finalPokemons = basicSummaries.map((pokemon, index) => {
          const species = speciesResults[index]
          const ko = species.names.find((n) => n.language.name === 'ko')
          return {
            ...pokemon,
            koreanName: ko ? ko.name : pokemon.name // 한국어 없으면 영어로 대체
          }
        })

        // 4. 완성된 데이터를 state에 저장
        setPokemons(finalPokemons)
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