import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'
import Section from '../../../Section'
import RecipientDetailConfig from '../../../../src/containers/RecipientDetails/Config'

const mockAccounts = [
  {
    agency: '777',
    bank: '340',
    id: '1',
    name: 'First account',
    number: '0001',
    number_digit: '1',
    type: 'conta_corrente',
  },
  {
    agency: '888',
    agency_digit: '1',
    bank: '340',
    id: '2',
    name: 'Second account',
    number: '0002',
    number_digit: '2',
    type: 'conta_corrente',
  },
]

const mockAnticipation = {
  anticipationDays: '25',
  anticipationModel: 'automatic_volume',
  anticipationVolumePercentage: '85',
}

const mockTransfer = {
  transferDay: '1',
  transferEnabled: true,
  transferInterval: 'weekly',
}

const mockBankAccount = {
  agency: '1111',
  agency_digit: '',
  bank: '001',
  id: '1',
  name: 'Conta Bancária',
  number: '11111',
  number_digit: '1',
  type: 'conta_corrente',
}

const RecipientDetailConfigExample = () => (
  <Section>
    <Card>
      <RecipientDetailConfig
        accounts={mockAccounts}
        bankAccount={mockBankAccount}
        anticipation={mockAnticipation}
        transfer={mockTransfer}
        onSaveAnticipation={action('Saved Anticipation Data')}
        onSaveTransfer={action('Saved Transfer Data')}
        onSaveBankAccount={action('Saved Bank Account Data')}
        onCancel={action('Cancel')}
        t={translate => translate}
      />
    </Card>
  </Section>
)

export default RecipientDetailConfigExample
