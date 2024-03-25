import { createStore } from './store.tsx'

export interface TestGroup {
  groupId: number
  groupName: string
  active: boolean
  createdDate: string
  allowRegistration: boolean
}

export interface User {
  userKey: string
  gender: boolean
  icon: string
  email: string
  groupId: number
  createdDate: string
  soloTestVariant: string
  duoTestVariant: string
  botVariant: string
}

interface AppState {
  groups: TestGroup[]
}

const initialState: AppState = {
  groups: [],
}

const appStore = createStore(initialState)

export { appStore }
