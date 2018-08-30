import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  CardContent,
  Spacing,
} from 'former-kit'

import ErrorIcon from './ErrorIcon.svg'
import style from '../style.css'

const ErrorStep = ({
  onExit,
  onTryAgain,
  t,
}) => (
  <CardContent className={style.flex}>
    <ErrorIcon />
    <p className={style.centerText}>
      {t('pages.recipients.message_fail')}
    </p>
    <div>
      <Button
        fill="outline"
        onClick={onExit}
      >
        {t('pages.recipients.exit')}
      </Button>
      <Spacing size="large" />
      <Button
        fill="gradient"
        onClick={onTryAgain}
      >
        {t('pages.recipients.try_again')}
      </Button>
    </div>
  </CardContent>
)

ErrorStep.propTypes = {
  onExit: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default ErrorStep
