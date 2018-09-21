import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../Section'
import BankAccountStep from '../../../../src/containers/AddRecipient/BankAccountStep'

const exampleAccounts = [
  {
    name: 'First account',
    number: '0001',
    type: 'conta_corrente',
    agency: '7',
    bank: '001',
    id: '1',
  },
  {
    name: 'Second account',
    number: '0002',
    type: 'conta_corrente',
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
