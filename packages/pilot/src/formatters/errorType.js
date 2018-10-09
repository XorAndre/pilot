import { path } from 'ramda'

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
export const FORM_SUBMIT_ERROR = 'FORM_DATA_ERROR'
export const PERMISSION_ERROR = 'PERMISSION_ERROR'
export const SERVER_ERROR = 'SERVER_ERROR'
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR'

export const possibleErrors = [
  AUTHENTICATION_ERROR,
  FORM_SUBMIT_ERROR,
  PERMISSION_ERROR,
  SERVER_ERROR,
  UNKNOWN_ERROR,
]

const getHttpErrorCode = path(['response', 'status'])

export const errorType = (error) => {
  const errorCode = getHttpErrorCode(error)
  if (!errorCode) return UNKNOWN_ERROR
  if (errorCode === 400) return FORM_SUBMIT_ERROR
  if (errorCode === 401 || errorCode === 410) return AUTHENTICATION_ERROR
  if (errorCode === 403) return PERMISSION_ERROR
  if (errorCode >= 500) return SERVER_ERROR
  return UNKNOWN_ERROR
}
