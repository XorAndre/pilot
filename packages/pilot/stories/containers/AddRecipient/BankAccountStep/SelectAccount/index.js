import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../../Section'
import SelectAccount from '../../../../../src/containers/AddRecipient/BankAccountStep/SelectAccount'

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

const SelectAccountExample = () => (
  <Section>
    <Card>
      <SelectAccount
        accounts={exampleAccounts}
        onContinue={action('Continue')}
        onBack={action('Back')}
        onCancel={action('Cancel')}
        t={t => t}
      />
    </Card>
  </Section>
)

export default SelectAccountExample
