import { createAction } from 'redux-actions'

export { default as ErrorBoundary } from './ErrorBoundary'

export { default as withError } from './withError'

export { default } from './reducer'

export { default as epic } from './epic'

export const API_ERROR_RECEIVE = 'pilot/error/API_ERROR_RECEIVE'
export const receiveError = createAction(API_ERROR_RECEIVE)

export const REACT_ERROR_RECEIVE = 'pilot/error/REACT_ERROR_RECEIVE'
export const receiveReactError = createAction(REACT_ERROR_RECEIVE)

export const CLEAR_ERROR = 'pilot/error/CLEAR_ERROR'
export const clearError = createAction(CLEAR_ERROR)

export const CLEAR_ERRORS_BY_CODE = 'pilot/error/CLEAR_ERRORS_BY_CODE'
export const clearErrorByStatusCode = createAction(CLEAR_ERRORS_BY_CODE)

export const CLEAR_ALL_ERRORS = 'pilot/error/CLEAR_ALL_ERRORS'
export const clearAllErrors = createAction(CLEAR_ALL_ERRORS)
