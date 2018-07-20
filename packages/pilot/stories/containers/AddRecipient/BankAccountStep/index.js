import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../Section'
import BankAccountStep from '../../../../src/containers/AddRecipient/BankAccountStep'

const exampleAccounts = [
  {
    name: 'First account',
    id: '1',
  },
  {
    name: 'Second account',
    id: '2',
  },
]

const AddAccountExample = () => (
  <Section>
    <Card>
      <BankAccountStep
        onContinue={action('Continue')}
        onBack={action('Back')}
        onCancel={action('Cancel')}
        t={t => t}
        accounts={exampleAccounts}
      />
    </Card>
  </Section>
)

export default AddAccountExample
