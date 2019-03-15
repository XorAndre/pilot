import {
  append,
  equals,
  includes,
  reject,
  uncurryN,
  unless,
  when,
} from 'ramda'
import {
  API_ERROR_RECEIVE,
  CLEAR_ALL_ERRORS,
  CLEAR_ERROR,
  REACT_ERROR_RECEIVE,
} from '.'
import getResponseError from '../../formatters/apiError'
import getReactError from '../../formatters/reactError'

const initialState = []

const addNewError = uncurryN(2, err => unless(
  includes(err),
  append(err)
))

const removeError = uncurryN(2, err => when(
  includes(err),
  reject(equals(err))
))

const classifier = {
  400: 'not authorized',
  401: 'not authorized',
  403: 'not authorized',
}

const mapErrorToAction = (error) => {
  const x = classifier[error.status]
  // add call to action field to the error object
  // use this call to action to get the empty state which will be shown
  // add routes and global fields to the error
  // map all api and react errors

  return null
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case API_ERROR_RECEIVE: {
      const error = getResponseError(action.payload)

      const newState = addNewError(error, state)

      debugger // eslint-disable-line

      return newState
    }

    case REACT_ERROR_RECEIVE: {
      const error = getReactError(action.payload)

      const newState = addNewError(error, state)

      debugger // eslint-disable-line

      return newState
    }

    case CLEAR_ERROR: {
      const error = action.payload

      const newState = removeError(error, state)

      return newState
    }

    case CLEAR_ALL_ERRORS:
      return initialState

    default:
      return state
  }
}
