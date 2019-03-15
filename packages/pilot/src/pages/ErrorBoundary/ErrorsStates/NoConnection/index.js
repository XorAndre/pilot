import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import {
  Modal,
  ModalContent,
} from 'former-kit'
import { Message } from '../../../../components/Message'
import Icon from './Icon.svg'

const enhanced = translate()

const NoConnection = ({ t }) => (
  <Modal isOpen >
    <ModalContent>
      <Message
        image={<Icon width={365} height={148} />}
        message={t('pages.error.no_connection')}
        title={t('pages.error.no_connection_title')}
      />
    </ModalContent>
  </Modal>
)

NoConnection.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(NoConnection)
