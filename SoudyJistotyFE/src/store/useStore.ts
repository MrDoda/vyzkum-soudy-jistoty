import { useEffect, useMemo, useState } from 'react'
import { Store } from './store'

export function useStore<T>(store: Store<T>): T
export function useStore<T, U extends keyof T = never>(store: Store<T>, key: U): T[U]
export function useStore<T, U extends keyof T = never>(store: Store<T>, key?: U) {
  const selector = useMemo(() => (state: T) => key ? state[key] : state, [key])

  const [state, setState] = useState(selector(store.getState()))

  useEffect(() => store.subscribe(state => setState(selector(state))), [selector, store])

  return state
}
