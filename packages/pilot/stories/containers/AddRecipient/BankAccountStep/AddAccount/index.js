import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../../Section'
import AddAccount from '../../../../../src/containers/AddRecipient/BankAccountStep/AddAccount'

const AddAccountExample = () => (
  <Section>
    <Card>
      <AddAccount
        onContinue={action('Continue')}
        onBack={action('Back')}
        onCancel={action('Cancel')}
        t={t => t}
      />
    </Card>
  </Section>
)

export default AddAccountExample
