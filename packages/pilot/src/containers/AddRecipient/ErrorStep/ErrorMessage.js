import React from 'react'
import PropTypes from 'prop-types'

import style from '../style.css'

import {
  possibleErrors,
  FORM_SUBMIT_ERROR,
  AUTHENTICATION_ERROR,
  PERMISSION_ERROR,
  SERVER_ERROR,
  UNKNOWN_ERROR,
} from '../../../formatters/errorType'

const ErrorMessage = ({ t, error }) => {
  let errorMessage

  switch (error) {
    case FORM_SUBMIT_ERROR:
      errorMessage = t('pages.add_recipient.fail_submit_data')
      break

    case AUTHENTICATION_ERROR:
      errorMessage = t('pages.add_recipient.expired_session')
      break

    case PERMISSION_ERROR:
      errorMessage = t('pages.add_recipient.no_permission')
      break

    case SERVER_ERROR:
      errorMessage = t('pages.add_recipient.server_error')
      break

    case UNKNOWN_ERROR:
    default:
      errorMessage = t('pages.add_recipient.fail_create_recipient')
      break
  }

  return (
    <p className={style.centerText}>
      {errorMessage}
    </p>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.oneOf(possibleErrors),
  t: PropTypes.func.isRequired,
}

ErrorMessage.defaultProps = {
  error: UNKNOWN_ERROR,
}

export default ErrorMessage
