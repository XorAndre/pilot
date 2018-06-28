import { createAction } from 'redux-actions'

export const SEARCH_REQUEST = 'pilot/recipients/SEARCH_REQUEST'
export const requestSearch = createAction(SEARCH_REQUEST)

export const SEARCH_RECEIVE = 'pilot/recipients/SEARCH_RECEIVE'
export const receiveSearch = createAction(SEARCH_RECEIVE)
