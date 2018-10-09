import React from 'react'
import PropTypes from 'prop-types'
import { Button, Spacing } from 'former-kit'

import {
  possibleErrors,
  AUTHENTICATION_ERROR,
  PERMISSION_ERROR,
  SERVER_ERROR,
  UNKNOWN_ERROR,
} from '../../../formatters/errorType'

const ErrorButtons = ({
  error,
  onExit,
  onLoginAgain,
  onTryAgain,
  t,
}) => {
  const LoginAgainButton = () => (
    <div>
      <Button fill="gradient" onClick={onLoginAgain}>
        {t('pages.add_recipient.login_again')}
      </Button>
    </div>
  )

  const ExitButton = () => (
    <div>
      <Button fill="gradient" onClick={onExit}>
        {t('pages.add_recipient.exit')}
      </Button>
    </div>
  )

  const TryAgainAndExitButtons = () => (
    <div>
      <Button fill="outline" onClick={onExit}>
        {t('pages.add_recipient.exit')}
      </Button>
      <Spacing size="large" />
      <Button fill="gradient" onClick={onTryAgain}>
        {t('pages.add_recipient.try_again')}
      </Button>
    </div>
  )

  if (error === AUTHENTICATION_ERROR) {
    return <LoginAgainButton />
  }

  if (error === PERMISSION_ERROR || error === SERVER_ERROR) {
    return <ExitButton />
  }

  return <TryAgainAndExitButtons />
}

ErrorButtons.propTypes = {
  error: PropTypes.oneOf(possibleErrors),
  onExit: PropTypes.func.isRequired,
  onLoginAgain: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ErrorButtons.defaultProps = {
  error: UNKNOWN_ERROR,
}

export default ErrorButtons
