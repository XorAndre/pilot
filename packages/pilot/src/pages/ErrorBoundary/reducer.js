import React from 'react'
import {
  __,
  append,
  curry,
  either,
  equals,
  isEmpty,
  includes,
  pipe,
  props,
  propSatisfies,
  reject,
  uncurryN,
  unless,
  when,
} from 'ramda'
import {
  API_ERROR_RECEIVE,
  CLEAR_ALL_ERRORS,
  CLEAR_ERROR,
  CLEAR_ERRORS_BY_CODE,
  REACT_ERROR_RECEIVE,
} from '.'
import getResponseError from '../../formatters/apiError'
import getReactError from '../../formatters/reactError'

import UnauthorizedError from './ErrorsStates/Unauthorized'
import NoConnectionError from './ErrorsStates/NoConnection'

const initialState = []

const addNewError = uncurryN(2, err => unless(
  includes(err),
  append(err)
))

const removeError = uncurryN(2, err => when(
  includes(err),
  reject(equals(err))
))

const isInCodes = codes => includes(__, codes)

const hasStatusInCodes = codes => propSatisfies(isInCodes(codes), 'status')

const isGenericApiError = pipe(
  props(['type', 'global', 'status']),
  equals(['apiError', true, undefined])
)

const removeErrorsByStatusCode = uncurryN(
  2,
  codes => reject(either(
    hasStatusInCodes(codes),
    isGenericApiError
  ))
)

const classifier = {
  400: () => 'Bad request',
  401: () => <UnauthorizedError />,
  403: () => 'Forbiden',
  404: () => 'Not found',
  405: () => 'Method Not Allowed',
  410: () => <UnauthorizedError />,
  500: () => 'Internal server error',
}

const addErrorComponent = (error) => {
  let getErrorComponent = classifier[error.status]
  const globalError = !error.affectedRoutes || isEmpty(error.affectedRoutes)

  if (!getErrorComponent && globalError) {
    getErrorComponent = () => 'Generic error'
  }

  return {
    ...error,
    getErrorComponent,
    global: globalError,
  }
}

const formatError = uncurryN(3, (formatter, error) => pipe(
  curry(formatter)(error),
  addErrorComponent
))

const addError = (formatter, payload, state) => {
  let formmatedError
  if (payload && payload.error && payload.affectedRoutes) {
    formmatedError = formatError(
      formatter,
      payload.error,
      payload.affectedRoutes
    )
  } else {
    formmatedError = formatError(formatter, payload, payload.affectedRoutes)
  }

  return addNewError(formmatedError, state)
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case API_ERROR_RECEIVE: {
      const error = getResponseError(action.payload)
      // eslint-disable-next-line no-undef
      if (error.message === 'Failed to fetch' && !navigator.onLine) {
        return addNewError(
          {
            ...error,
            getErrorComponent: () => <NoConnectionError />,
            global: true,
          },
          state
        )
      }

      return addError(
        getResponseError,
        action.payload,
        state
      )
    }

    case REACT_ERROR_RECEIVE: {
      return addError(
        getReactError,
        action.payload.error,
        state
      )
    }

    case CLEAR_ERROR: {
      const error = action.payload

      const newState = removeError(error, state)

      return newState
    }

    case CLEAR_ALL_ERRORS:
      return initialState

    case CLEAR_ERRORS_BY_CODE: {
      const newState = removeErrorsByStatusCode(action.payload, state)

      return newState
    }

    default:
      return state
  }
}
