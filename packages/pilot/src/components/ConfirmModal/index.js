import React from 'react'
import PropTypes from 'prop-types'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Spacing,
} from 'former-kit'

const ConfirmModal = ({
  cancelText,
  children,
  confirmText,
  isOpen,
  onCancel,
  onConfirm,
  title,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onCancel}
  >
    <ModalTitle
      title={title}
      closeIcon={<IconClose width={16} height={16} />}
      onClose={onCancel}
    />
    <ModalContent>
      {children}
    </ModalContent>
    <ModalActions>
      <Spacing />
      <Button fill="outline" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button fill="gradient" onClick={onConfirm}>
        {confirmText}
      </Button>
      <Spacing />
    </ModalActions>
  </Modal>
)

ConfirmModal.propTypes = {
  cancelText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  confirmText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default ConfirmModal
