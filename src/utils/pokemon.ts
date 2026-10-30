import type { NamedAPIResource, PokemonSummary } from '../types/pokemon'

const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

// "https://pokeapi.co/api/v2/pokemon/25/" → 25
export function getIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean) // 빈 문자열 제거
  return Number(parts[parts.length - 1])
}

export function getArtworkUrl(id: number): string {
  return `${ARTWORK_URL}/${id}.png`
}

// API 응답 → 화면용 모양으로 가공
export function toSummary({ name, url }: NamedAPIResource): PokemonSummary {
  const id = getIdFromUrl(url)
  return { id, name, imageUrl: getArtworkUrl(id) }
}