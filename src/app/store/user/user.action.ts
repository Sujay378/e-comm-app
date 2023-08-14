import { createAction, props } from '@ngrx/store'
import { User } from '../../models/state.model';

enum userActions {
  updateLoginStatus = '[USER] UPDATE_LOGIN_STATUS',
  loadUser = '[USER] LOAD_USER',
  resetUser = '[USER] REST_USER'
}

export const updateLoginStatus = createAction(
  userActions.updateLoginStatus,
  props<{payload: boolean}>()
);

export const loadUser = createAction(
  userActions.loadUser,
  props<{payload: User}>()
)

export const resetUser = createAction(
  userActions.resetUser,
)
