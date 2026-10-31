import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1) 처음 한 번만 localStorage에서 꺼내기
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? (JSON.parse(saved) as T) : initialValue
    } catch {
      return initialValue // 저장된 값이 깨져 있으면 기본값 사용
    }
  })

  // 2) 값이 바뀔 때마다 저장하기
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // 용량 초과 등으로 저장에 실패해도 앱은 계속 동작하도록
    }
  }, [key, value])

  return [value, setValue] as const
}