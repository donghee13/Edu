// PokeAPI 곳곳에서 쓰이는 "이름 + 상세 주소" 묶음
export type NamedAPIResource = {
  name: string
  url: string
}

// GET /pokemon?limit=&offset= 의 응답
export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

// GET /pokemon/{id} 의 응답 (필요한 부분만)
export type Pokemon = {
  id: number
  name: string
  height: number // 데시미터(dm)
  weight: number // 헥토그램(hg) 둘 다 10으로 나누면 m, kg 나옴
  sprites: {
    front_default: string | null
    other: {
      'official-artwork': {
        front_default: string | null
      }
    }
  }
  types: {
    slot: number
    type: NamedAPIResource
  }[]
  stats: {
    base_stat: number
    stat: NamedAPIResource
  }[]
}

// 화면(카드)에서 쓰기 편하도록 우리가 가공한 모양
export type PokemonSummary = {
  id: number
  name: string
  imageUrl: string
}