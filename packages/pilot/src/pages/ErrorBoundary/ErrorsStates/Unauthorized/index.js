import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  ModalContent,
} from 'former-kit'
import { Message, MessageActions } from '../../../../components/Message'
import { clearErrorByStatusCode } from '../../'
import { requestLogout } from '../../../Account/actions'
import Icon from './Icon.svg'

const mapDispatchToProps = dispatch => ({
  clearErrors: codes => dispatch(clearErrorByStatusCode(codes)),
  logout: () => dispatch(requestLogout()),
})

const enhanced = compose(
  connect(null, mapDispatchToProps),
  withRouter,
  translate()
)

const Unauthorized = ({
  logout,
  t,
}) => (
  <Modal isOpen >
    <ModalContent>
      <Message
        image={<Icon width={365} height={148} />}
        message={t('pages.error.unauthorized')}
        title={t('pages.error.unauthorized_title')}
      >
        <MessageActions>
          <Button
            fill="gradient"
            onClick={logout}
          >
            {t('pages.error.back_to_home')}
          </Button>
        </MessageActions>
      </Message>
    </ModalContent>
  </Modal>
)

Unauthorized.propTypes = {
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(Unauthorized)
