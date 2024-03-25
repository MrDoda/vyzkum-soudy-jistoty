export function createStore<T>(initialState: T) {
  let state = initialState
  const listeners = new Set<(state: T) => void>()
  return {
    clear: () => {
      state = initialState
    },
    getState: () => state,
    setState: (newState: Partial<T> | ((state: T) => Partial<T>)) => {
      if (typeof newState === 'function') {
        if (typeof state === 'object' && state !== null && !Array.isArray(state)) {
          state = { ...state, ...newState(state) }
        } else {
          state = newState(state) as T
        }
      } else if (typeof state === 'object' && state !== null && !Array.isArray(state)) {
        state = { ...state, ...newState }
      } else {
        state = newState as T
      }
      listeners.forEach((listener: (state: T) => void) => listener(state))
    },
    subscribe: (listener: (state: T) => void) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

export type Store<T> = ReturnType<typeof createStore<T>>
