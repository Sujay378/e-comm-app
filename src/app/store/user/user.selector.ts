import { createSelector } from '@ngrx/store';
import { AppState, User, UserState } from 'src/app/models/state.model';

export const userSelector = (state: AppState) => state.user;

export const logged = createSelector(userSelector, (state: UserState) => state.logged);

export const userData = createSelector(userSelector, (state: UserState) => state.user);

export const isAdmin = createSelector(userData, (user: User) => user.admin);

export const authToken = createSelector(userData, (user: User) => user.token);
