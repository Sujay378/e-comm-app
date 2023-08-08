export interface AppState {
  global: globalState
}

export interface globalState {
  isAppProcessing: boolean,
  contentLoaded: boolean
}
