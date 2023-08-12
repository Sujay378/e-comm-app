import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../models/state.model'
import { loadUser, resetUser, updateLoginStatus } from './user.action';

const initialState: UserState = {
  logged: false,
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(updateLoginStatus, (state, action) => {
    return {
      ...state,
      logged: action.payload
    };
  }),
  on(loadUser, (state, action) => {
    return {
      ...state,
      user: action.payload
    };
  }),
  on(resetUser, (state, action) => {
    return {
      ...initialState
    };
  })
)
