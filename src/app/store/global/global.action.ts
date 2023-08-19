import { createAction, props } from '@ngrx/store'

enum globalActions {
  updateAppProcessing = '[GLOBAL] UPDATE_APP_PROCESSING',
  updateContentLoaded = '[GLOBAL] UPDATE_CONTENT_LOADED',
  updateViewLoading = '[GLOBAL] UPDATE_VIEW_LOADING'
}

export const appProcessing = createAction(
  globalActions.updateAppProcessing,
  props<{payload: boolean}>()
);

export const updateContentLoaded = createAction(
  globalActions.updateContentLoaded,
  props<{payload: boolean}>()
)

export const updateViewLoading = createAction(
  globalActions.updateViewLoading,
  props<{payload: boolean}>()
)
