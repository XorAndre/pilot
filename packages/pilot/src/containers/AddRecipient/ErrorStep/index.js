import React, { Component } from 'react'
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

import { virtualPageView } from '../../../vendor/googleTagManager'

class ErrorStep extends Component {
  componentDidMount () {
    virtualPageView({
      path: '/virtual/recipient/add/error',
      title: 'Add Recipient - Error',
    })
  }

  render () {
    const { t } = this.props

    return (
      <CardContent className={style.flex}>
        <ErrorIcon />
        <h2 className={style.title}>
          {t('pages.add_recipient.ops')}
        </h2>
        <ErrorMessage {...this.props} />
        <ErrorButtons {...this.props} />
      </CardContent>
    )
  }
}

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
