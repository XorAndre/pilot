import React from 'react'
import PropTypes from 'prop-types'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import { Alert } from 'former-kit'
import { pathOr } from 'ramda'

const ErrorAlert = ({
  t,
  error,
}) => {
  const unknownErrorMessage = t('pages.balance.unknown_error')
  const errorMessagePath = ['errors', 0, 'message']
  const message = pathOr(unknownErrorMessage, errorMessagePath, error)

  return (
    <Alert
      icon={<IconInfo height={16} width={16} />}
      type="info"
    >
      <span>
        {message}
      </span>
    </Alert>
  )
}

ErrorAlert.propTypes = {
  t: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
}

ErrorAlert.defaultProps = {
  error: {},
}

export default ErrorAlert
