import { request } from './client'
import type { Pokemon, PokemonListResponse, PokemonSpecies } from '../types/pokemon'

export function getPokemonList(limit: number, offset: number, signal?: AbortSignal) {
  return request<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`, { signal })
}

export function getPokemon(idOrName: number | string, signal?: AbortSignal) {
  return request<Pokemon>(`/pokemon/${idOrName}`, { signal })
}

export function getPokemonSpecies(idOrName: number | string, signal?: AbortSignal) {
  return request<PokemonSpecies>(`/pokemon-species/${idOrName}`, { signal })
}