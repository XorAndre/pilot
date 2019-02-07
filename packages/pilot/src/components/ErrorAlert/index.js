import React from 'react'
import PropTypes from 'prop-types'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import { Alert } from 'former-kit'
import { pathOr } from 'ramda'

const ErrorAlert = ({
  error,
  t,
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
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
  t: PropTypes.func.isRequired,
}

ErrorAlert.defaultProps = {
  error: {},
}

export default ErrorAlert

