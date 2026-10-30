import { useEffect, useState } from 'react'
import { getPokemon } from '../api/pokemon'
import type { Pokemon } from '../types/pokemon'

export function usePokemon(id: number) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getPokemon(id, controller.signal)
        setPokemon(data)
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

  return { pokemon, isLoading, error }
}