import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../../Section'
import SelectAccount from '../../../../../src/containers/AddRecipient/BankAccountStep/SelectAccount'

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
