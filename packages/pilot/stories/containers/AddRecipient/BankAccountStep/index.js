import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../Section'
import BankAccountStep from '../../../../src/containers/AddRecipient/BankAccountStep'

const exampleAccounts = [
  {
    account_name: 'First account',
    account_number: '0001',
    account_type: 'conta_corrente',
    agency: '7',
    bank: '340',
    id: '1',
  },
  {
    account_name: 'Second account',
    account_number: '0002',
    account_type: 'conta_corrente',
    agency: '8',
    bank: '340',
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
