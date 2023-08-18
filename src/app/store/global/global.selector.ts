import { createSelector } from '@ngrx/store';
import { AppState, GlobalState } from 'src/app/models/state.model';

export const globalSelector = (state: AppState) => state.global;

export const isAppProcessing = createSelector(
  globalSelector,
  (state: GlobalState) => state.isAppProcessing
)

export const isViewLoading = createSelector(
  globalSelector,
  (state: GlobalState) => state.isViewLoading
)

export const isContentLoaded = createSelector(
  globalSelector,
  (state: GlobalState) => state.contentLoaded
)
