import React from 'react'
import { Card } from 'former-kit'

import Section from '../../Section'
import RecipientDetailInfo from '../../../src/containers/RecipientDetailInfo'

const identification = {
  cnpj: '11.111.111/1111-11',
  cnpjEmail: 'star@wars.com',
  cnpjInformation: true,
  cnpjName: 'Star Wars Ltda',
  cnpjPhone: '21 2222-2222',
  cnpjUrl: 'http://www.starwars.com',
  cpf: '111-111-111-11',
  cpfEmail: 'barroso@barroso.com',
  cpfInformation: false,
  cpfName: 'Guilherme Melo Barroso',
  cpfPhone: '21 99999-9999',
  cpfUrl: 'www.cpfUrl.com.br',
  documentType: 'cnpj',
  partnerNumber: '4',
  partner0: {
    cpf: '222.222.222-22',
    name: 'Luke Skywalker',
    phone: '21 99999-9999',
  },
  partner1: {
    cpf: '111.111.111-11',
    name: 'Han Solo',
    phone: '21 99999-9999',
  },
  partner2: {
    cpf: '333.333.333-33',
    name: 'Princess Leia',
    phone: '11 88888-8888',
  },
  partner3: {
    cpf: '444.444.444-44',
    name: 'Chewie',
    phone: '11 77777-7777',
  },
  partner4: {
    cpf: '',
    name: '',
    phone: '',
  },
}

const configuration = {
  anticipationModel: 'Automática por volume',
  anticipationVolumePercentage: '50',
  anticipationDays: '',
  transferEnabled: true,
  transferInterval: 'Mensal',
  transferDay: '15',
  transferWeekday: 'Terça-feira',
}

const bankAccount = {
  account_name: 'Conta Bancária',
  account_number: '11111-1',
  account_type: 'Conta-corrente',
  agency: '1111',
  bank: '351 - Itaú Unibanco SA',
}

const RecipientDetailExample = () => (
  <Section>
    <Card>
      <RecipientDetailInfo
        identification={identification}
        configuration={configuration}
        bankAccount={bankAccount}
        t={t => t}
      />
    </Card>
  </Section>
)

export default RecipientDetailExample
