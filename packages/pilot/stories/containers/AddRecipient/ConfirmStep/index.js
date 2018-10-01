import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../../Section'
import ConfirmStep from '../../../../src/containers/AddRecipient/ConfirmStep'

const mockData = {
  identification: {
    cnpj: '11.111.111/1111-11',
    cnpjEmail: 'pbftech@email.com',
    cnpjInformation: true,
    cnpjName: 'PBF Tecnologia',
    cnpjPhone: '21 2222-2222',
    cnpjUrl: 'http://www.pbftec.com.br',
    cpf: '111-111-111-11',
    cpfEmail: 'barroso@barroso.com',
    cpfInformation: false,
    cpfName: 'Guilherme Melo Barroso',
    cpfPhone: '21 99999-9999',
    cpfUrl: '',
    documentType: 'cnpj',
    partnerNumber: '2',
    partner0: {
      cpf: '222.222.222-22',
      name: 'Paulo Barroso',
      phone: '21 99999-9999',
    },
    partner1: {
      cpf: '111.111.111-11',
      name: 'Guilherme Barroso',
      phone: '21 99999-9999',
    },
    partner2: {
      cpf: '',
      name: '',
      phone: '',
    },
    partner3: {
      cpf: '',
      name: '',
      phone: '',
    },
    partner4: {
      cpf: '',
      name: '',
      phone: '',
    },
  },
  configuration: {
    anticipationDays: '25',
    anticipationModel: 'automatic_volume',
    anticipationVolumePercentage: '50',
    transferDay: '15',
    transferEnabled: true,
    transferInterval: 'monthly',
    transferWeekday: 'tuesday',
  },
  bankAccount: {
    agency: '1111',
    agency_digit: '',
    bank: '001',
    name: 'Conta Bancária',
    number: '11111',
    number_digit: '1',
    type: 'conta_corrente',
  },
}

const ConfirmRecipientStep = () => (
  <Section>
    <Card>
      <ConfirmStep
        data={mockData}
        onBack={action('Back')}
        onCancel={action('Cancel')}
        onContinue={action('Continue')}
        onCreate={action('Create')}
        onEdit={action()}
        t={t => t}
      />
    </Card>
  </Section>
)

export default ConfirmRecipientStep
