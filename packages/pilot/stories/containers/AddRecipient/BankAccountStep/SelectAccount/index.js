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

const exampleOfSharedData = {
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
    partner0: {
      cpf: '222.222.222-22',
      email: 'email@mail.com',
      name: 'Paulo Barroso',
    },
    partner1: {
      cpf: '111.111.111-11',
      email: 'email@mail.com',
      name: 'Guilherme Barroso',
    },
    partner2: {
      cpf: '',
      email: '',
      name: '',
    },
    partner3: {
      cpf: '',
      email: '',
      name: '',
    },
    partner4: {
      cpf: '',
      email: '',
      name: '',
    },
    partnerNumber: '2',
  },
}

const SelectAccountExample = () => (
  <Section>
    <Card>
      <SelectAccount
        accounts={exampleAccounts}
        sharedData={exampleOfSharedData}
        onContinue={action('Continue')}
        onBack={action('Back')}
        onCancel={action('Cancel')}
        t={t => t}
      />
    </Card>
  </Section>
)

export default SelectAccountExample
