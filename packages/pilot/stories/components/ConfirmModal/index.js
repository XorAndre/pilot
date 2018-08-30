import React from 'react'
import { action } from '@storybook/addon-actions'
import ConfirmModal from '../../../src/components/ConfirmModal'

const ConfirmModalTest = () => (
  <ConfirmModal
    isOpen
    onCancel={action('Cancel')}
    onConfirm={action('Confirm')}
    title="Titulo"
    cancelText="Cancelar"
    confirmText="Confirmar"
  >
    <p style={{ textAlign: 'center' }}>
      Tem certeza?
    </p>
  </ConfirmModal>
)

export default ConfirmModalTest
