import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import search, { RecipientsSearch } from './Search'

export const reducers = {
  search,
}

const RecipientsRouter = () => (
  <Switch>
    <Route
      path="/recipients"
      component={RecipientsSearch}
    />
  </Switch>
)

export default RecipientsRouter
