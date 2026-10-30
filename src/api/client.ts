const BASE_URL = 'https://pokeapi.co/api/v2'

// 상태 코드를 함께 담는 에러 (404인지 500인지 구분할 수 있도록)
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, options)

  // fetch는 404, 500이어도 에러를 던지지 않으므로 직접 확인!
  if (!response.ok) {
    throw new ApiError(response.status, `요청에 실패했어요 (${response.status})`)
  }

  return response.json() as Promise<T>
}