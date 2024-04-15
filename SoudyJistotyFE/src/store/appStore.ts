import { createStore } from './store.tsx'

export interface TestGroup {
  groupId: number
  groupName: string
  active: boolean
  createdDate: string
  allowRegistration: boolean
  activeDuo: boolean
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
  soloTestQuestions: string
  duoTestQuestions: string
  duoTestVariantOrder: string
  soloTestVariantOrder: string
  seeAnswers: 0 | 1
}

interface AppState {
  groups: TestGroup[]
  headers: {
    isAdmin?: string
    userKey?: string
    soloTest?: string
  }
}

const initialState: AppState = {
  groups: [],
  headers: {},
}

const appStore = createStore(initialState)

export { appStore }
