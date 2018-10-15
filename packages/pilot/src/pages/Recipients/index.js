import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import search, { RecipientsSearch } from './Search'
import RecipientsAdd from './Add'
import RecipientDetail from './Detail'

export const reducers = {
  search,
}

const RecipientsRouter = () => (
  <Switch>
    <Route
      path="/recipients/detail/:id"
      component={RecipientDetail}
    />
    <Route
      path="/recipients/add"
      component={RecipientsAdd}
    />
    <Route
      path="/recipients"
      component={RecipientsSearch}
    />
  </Switch>
)

export default RecipientsRouter
