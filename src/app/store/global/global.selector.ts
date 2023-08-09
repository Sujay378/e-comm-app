import { createSelector } from '@ngrx/store';
import { AppState, globalState } from 'src/app/models/state.model';

export const globalSelector = (state: AppState) => state.global;

export const isAppProcessing = createSelector(
  globalSelector,
  (state: globalState) => state.isAppProcessing
)

export const isContentLoaded = createSelector(
  globalSelector,
  (state: globalState) => state.contentLoaded
)
