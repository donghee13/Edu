import { useEffect, useState } from 'react'
import { getPokemon, getPokemonSpecies} from '../api/pokemon'
import type { Pokemon } from '../types/pokemon'

export function usePokemon(id: number) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [koreanName, setKoreanName] = useState<string>('') // 한국어 이름 추가
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const [pokemonData, speciesData] = await Promise.all([
          getPokemon(id, controller.signal),
          getPokemonSpecies(id, controller.signal)
        ])
        setPokemon(pokemonData)

        // 한국어 이름 찾기
        const koreanNameEntry = speciesData.names.find(name => name.language.name === 'ko')
        if (koreanNameEntry) {
          setKoreanName(koreanNameEntry.name)
        }
      } catch (err) {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했어요')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [id])

  return { pokemon, koreanName, isLoading, error }
}