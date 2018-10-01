import React from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import { Card } from 'former-kit'
import Section from '../../Section'
import RecipientDetails from '../../../src/containers/RecipientDetails'
import mock from '../../../src/containers/Balance/mock.json'

const mockRecipient = {
  name: 'Nome da Company LTDA',
  id: '12345678',
  status: 'Ativo',
  createDate: '31/12/1999',
  hash: 'rj_qwedaefsdfwerasfgwtwetwe',
}

const mockInformation = {
  identification: {
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
  },
  configuration: {
    anticipationModel: 'Automática por volume',
    anticipationVolumePercentage: '50',
    anticipationDays: '',
    transferEnabled: true,
    transferInterval: 'Mensal',
    transferDay: '15',
    transferWeekday: 'Terça-feira',
  },
  bankAccount: {
    agency_digit: '',
    agency: '1111',
    bank: '001',
    name: 'Conta Bancária',
    number_digit: '1',
    number: '11111',
    type: 'conta_corrente',
  },
}

const mockConfiguration = {
  anticipation: {
    anticipationDays: '25',
    anticipationModel: 'automatic_volume',
    anticipationVolumePercentage: '85',
  },
  transfer: {
    transferDay: '5',
    transferEnabled: true,
    transferInterval: 'weekly',
    transferWeekday: 'wednesday',
  },
  accounts: [
    {
      name: 'First account',
      number: '0001',
      type: 'conta_corrente',
      agency: '7',
      bank: '340',
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
  ],
  onSave: action('Saved'),
  onCancel: action('Cancel'),
}

const mockBalance = {
  anticipation: {
    available: 10000,
    error: false,
    loading: false,
  },
  dates: {
    end: moment().add(1, 'month'),
    start: moment(),
  },
  ...mock.result,
  query: {
    dates: {
      end: moment().add(1, 'month'),
      start: moment(),
    },
    page: 1,
  },
  total: {
    net: 1000000,
    outcoming: 1000000,
    outgoing: 1000000,
  },
  currentPage: 1,
  disabled: false,
  onAnticipationClick: action('anticipation'),
  onCancel: action('Cancel'),
  onCancelRequestClick: action('cancel request'),
  onFilterClick: action('filter click'),
  onPageChange: action('page click'),
  onSave: action('Saved'),
  onWithdrawClick: action('withdraw'),
}

const RecipientDetailsExample = () => (
  <Section>
    <Card>
      <RecipientDetails
        t={translate => translate}
        informationProps={mockInformation}
        configurationProps={mockConfiguration}
        balanceProps={mockBalance}
        recipient={mockRecipient}
      />
    </Card>
  </Section>
)

export default RecipientDetailsExample

