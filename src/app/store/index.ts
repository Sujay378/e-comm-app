import { ActionReducerMap } from '@ngrx/store';
import { globalReducer } from './global/global.reducer';

import { AppState } from '../models/state.model';

export const reducers: ActionReducerMap<AppState> = {
  global: globalReducer
}

export * from './global/global.action';
export * from './global/global.selector';
