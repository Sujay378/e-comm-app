import { createReducer, on } from "@ngrx/store";

import { GlobalState } from "src/app/models/state.model";
import * as fromGlobalActions from './global.action';

const initialState: GlobalState = {
  isViewLoading: false,
  isAppProcessing: false,
  contentLoaded: false
}

export const globalReducer = createReducer(
  initialState,
  on(fromGlobalActions.appProcessing, (state, action) => {
    return {...state, isAppProcessing: action.payload}
  }),
  on(fromGlobalActions.updateContentLoaded, (state, action) => {
    return { ...state, contentLoaded: action.payload }
  }),
  on(fromGlobalActions.updateViewLoading, (state, action) => {
    return {...state, isViewLoading: action.payload}
  })
)
