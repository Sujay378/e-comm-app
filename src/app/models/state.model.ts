export interface AppState {
  global: GlobalState,
  user: UserState
}

export interface GlobalState {
  isAppProcessing: boolean,
  contentLoaded: boolean
}

export interface UserState {
  logged: boolean,
  user: User
}

export interface User {
  name: string,
  email: string,
  admin: boolean,
  token: string
}
