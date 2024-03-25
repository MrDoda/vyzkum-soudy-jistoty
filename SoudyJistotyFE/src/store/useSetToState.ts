import { createStore } from './store'

export function useSetToState<T>(store: ReturnType<typeof createStore<T>>) {
  const setToState = <U extends keyof T>(value: T[U], propertyName: U) => {
    const newState: Partial<T> = {}
    newState[propertyName] = value
    store.setState(newState)
  }
  return {
    setToState,
  }
}
