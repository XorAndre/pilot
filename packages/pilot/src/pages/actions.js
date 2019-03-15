import { combineReducers } from 'redux'

import account, { epic as accountEpic } from './Account/actions'
import error from './ErrorBoundary'
import balance from './Balance'
import { reducers as transactionsReducers } from './Transactions'

export const rootEpic = accountEpic

export const rootReducer = combineReducers({
  account,
  balance,
  error,
  transactionDetails: transactionsReducers.details,
  transactions: transactionsReducers.search,
})
