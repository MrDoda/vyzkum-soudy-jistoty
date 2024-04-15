import { useState, useEffect } from 'react'

export function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    try {
      if (jsonValue != null) return JSON.parse(jsonValue)
    } catch {
      console.error('failed to load from localstorage')
    }

    if (typeof initialValue === 'function') {
      return initialValue()
    }
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
