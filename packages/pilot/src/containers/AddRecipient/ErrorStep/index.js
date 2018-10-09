import React from 'react'
import PropTypes from 'prop-types'
import { CardContent } from 'former-kit'

import ErrorIcon from './ErrorIcon.svg'
import ErrorMessage from './ErrorMessage'
import ErrorButtons from './ErrorButtons'
import style from '../style.css'

import {
  possibleErrors,
  UNKNOWN_ERROR,
} from '../../../formatters/errorType'

const ErrorStep = props => (
  <CardContent className={style.flex}>
    <ErrorIcon />
    <ErrorMessage {...props} />
    <ErrorButtons {...props} />
  </CardContent>
)

ErrorStep.propTypes = {
  error: PropTypes.oneOf(possibleErrors),
  onExit: PropTypes.func.isRequired,
  onLoginAgain: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ErrorStep.defaultProps = {
  error: UNKNOWN_ERROR,
}

export default ErrorStep
