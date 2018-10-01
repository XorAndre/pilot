import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../Section'
import BankAccountStep from '../../../../src/containers/AddRecipient/BankAccountStep'

const exampleAccounts = [
  {
    agency: '7',
    agency_digit: '',
    bank: '001',
    id: '1',
    name: 'First account',
    number: '000',
    number_digit: '1',
    type: 'conta_corrente',
  },
  {
    agency: '8',
    agency_digit: '',
    bank: '340',
    id: '2',
    name: 'Second account',
    number: '000',
    number_digit: '2',
    type: 'conta_corrente',
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
