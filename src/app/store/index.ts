import { ActionReducerMap } from '@ngrx/store';
import { globalReducer } from './global/global.reducer';
import { userReducer } from './user/user.reducer';

import { AppState } from '../models/state.model';

export const reducers: ActionReducerMap<AppState> = {
  global: globalReducer,
  user: userReducer
}

export * from './global/global.action';
export * from './global/global.selector';

export * from './user/user.action';
export * from './user/user.selector';
