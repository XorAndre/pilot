import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'
import Section from '../../../Section'
import RecipientDetailConfig from '../../../../src/containers/RecipientDetails/Config'

const mockAccounts = [
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

const mockAnticipation = {
  anticipationDays: '25',
  anticipationModel: 'automatic_volume',
  anticipationVolumePercentage: '85',
}

const mockTransfer = {
  transferDay: '5',
  transferEnabled: true,
  transferInterval: 'weekly',
  transferWeekday: 'wednesday',
}

const mockBankAccount = {
  addAccount: {
    account_name: '',
    account_number: '',
    account_type: '',
    agency: '',
    bank: '',
  },
  selectAccount: {
    account_id: '',
  },
}

const RecipientDetailConfigExample = () => (
  <Section>
    <Card>
      <RecipientDetailConfig
        accounts={mockAccounts}
        bankAccount={mockBankAccount}
        anticipation={mockAnticipation}
        transfer={mockTransfer}
        onSave={action('Saved')}
        onCancel={action('Cancel')}
        t={translate => translate}
      />
    </Card>
  </Section>
)

export default RecipientDetailConfigExample
