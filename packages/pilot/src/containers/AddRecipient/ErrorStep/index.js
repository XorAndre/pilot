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
      {t('pages.add_recipient.fail_create_recipient')}
    </p>
    <div>
      <Button
        fill="outline"
        onClick={onExit}
      >
        {t('pages.add_recipient.exit')}
      </Button>
      <Spacing size="large" />
      <Button
        fill="gradient"
        onClick={onTryAgain}
      >
        {t('pages.add_recipient.try_again')}
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
