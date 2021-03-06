import React from 'react'
import PropTypes from 'prop-types'
import {
  curry,
  head,
  isNil,
  pipe,
  split,
  values,
} from 'ramda'

import {
  matchPath,
  withRouter,
} from 'react-router-dom'

import SidebarContainer from '../../containers/Sidebar'

import routes from './routes'

import Logo from '../../components/Logo/logo.svg'

const removeRouteParams = pipe(
  split(':'),
  head
)

const handleLinkClick = curry((push, currentPath, route) => {
  const matched = matchPath(currentPath, route)

  if (isNil(matched) || !route.active) {
    push(route.path)
  }
})

const Sidebar = ({
  balance,
  companyName,
  history,
  location: { pathname },
  recipientId,
  sessionId,
  t,
}) => (
  <SidebarContainer
    balance={balance}
    companyName={companyName}
    links={values(routes)
      .filter(({ hidden }) => !hidden)
      .map(route => ({
        ...route,
        active: pathname.includes(removeRouteParams(route.path)),
      }))
    }
    logo={Logo}
    onAnticipate={() => history.push(`/anticipation/${recipientId}`)}
    onLinkClick={handleLinkClick(history.push, pathname)}
    onWithdraw={() => history.push(`/withdraw/${recipientId}`)}
    sessionId={sessionId}
    t={t}
  />
)

Sidebar.propTypes = {
  balance: PropTypes.shape({
    available: PropTypes.number,
    waitingFunds: PropTypes.number,
  }).isRequired,
  companyName: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  recipientId: PropTypes.string,
  sessionId: PropTypes.string,
  t: PropTypes.func.isRequired,
}

Sidebar.defaultProps = {
  companyName: '',
  recipientId: null,
  sessionId: '',
}

export default withRouter(Sidebar)
