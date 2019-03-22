const recipient = {
  object: 'recipient',
  id: 'ak_test_mik9xi1mCnCQa08H7peAF1J81XqeId',
  transfer_enabled: true,
  last_transfer: null,
  transfer_interval: 'weekly',
  transfer_day: 5,
  automatic_anticipation_enabled: true,
  automatic_anticipation_type: 'full',
  automatic_anticipation_days: null,
  automatic_anticipation_1025_delay: 0,
  anticipatable_volume_percentage: 85,
  date_created: '2017-01-06T18:59:35.936Z',
  date_updated: '2017-01-06T18:59:35.936Z',
  postback_url: 'https://requestb.in/tl0092tl',
  status: 'active',
  status_reason: null,
}

const recipientCPF = {
  ...recipient,
  bank_account: {
    object: 'bank_account',
    id: 17365090,
    bank_code: '341',
    agencia: '0932',
    agencia_dv: '5',
    conta: '58054',
    conta_dv: '1',
    type: 'conta_corrente',
    document_type: 'cpf',
    document_number: '26268738888',
    legal_name: 'API BANK ACCOUNT',
    charge_transfer_fees: true,
    date_created: '2017-01-06T18:52:22.215Z',
  },
}

const recipientCNPJ = {
  ...recipient,
  bank_account: {
    agencia: '987',
    agencia_dv: null,
    bank_code: '001',
    charge_transfer_fees: true,
    conta: '543',
    conta_dv: '2',
    date_created: '2018-10-09T17:14:48.161Z',
    document_number: '05750141000145',
    document_type: 'cnpj',
    id: 17908495,
    legal_name: 'GMB toys',
    object: 'bank_account',
    type: 'conta_corrente_conjunta',
  },
}

const registerIndividual = {
  type: 'individual',
  document_number: '92545278157',
  name: 'Someone',
  site_url: 'http://www.site.com',
  email: 'some@email.com',
  phone_numbers: [{
    ddd: '11',
    number: '11987654321',
    type: 'mobile',
  }],
}

const registerCompany = {
  type: 'corporation',
  document_number: '43633675456',
  company_name: 'Full Name Company',
  email: 'some@email.com',
  site_url: 'http://www.site.com',
  phone_numbers: [{
    ddd: '11',
    number: '11987654321',
    type: 'mobile',
  }],
  managing_partners: [{
    type: 'individual',
    document_number: '925452787',
    email: 'some@email.com',
    name: 'Someone',
  }],
}

const recipientCPFWithRegister = {
  ...recipientCPF,
  register_information: registerIndividual,
}

const recipientCNPJWithRegister = {
  ...recipientCNPJ,
  register_information: registerCompany,
}

const recipientAnticipationData = {
  automatic_anticipation_enabled: true,
  automatic_anticipation_type: 'full',
  automatic_anticipation_days: null,
  automatic_anticipation_1025_delay: 0,
  anticipatable_volume_percentage: 85,
}

const recipientTransferData = {
  transfer_enabled: true,
  last_transfer: null,
  transfer_interval: 'monthly',
  transfer_day: 5,
}

const recipientBankAccountData = {
  legal_name: 'Nome da Conta',
  conta: '123',
  conta_dv: '4',
  type: 'conta_corrente',
  agencia: '1234',
  agencia_dv: '9',
  bank_code: '001',
  id: '17935047',
}

export const before = {
  recipientCPF,
  recipientCPFWithRegister,
  recipientCNPJ,
  recipientCNPJWithRegister,
  recipientAnticipationData,
  recipientTransferData,
  recipientBankAccountData,
}

const recipientCPFData = {
  createDate: '2017-01-06T18:59:35.936Z',
  hash: 'ak_test_mik9xi1mCnCQa08H7peAF1J81XqeId',
  id: '17365090',
  name: 'API BANK ACCOUNT',
  status: 'active',
}

const recipientCPFDataWithRegister = {
  createDate: '2017-01-06T18:59:35.936Z',
  hash: 'ak_test_mik9xi1mCnCQa08H7peAF1J81XqeId',
  id: '17365090',
  name: 'Someone',
  status: 'active',
}

const recipientCNPJData = {
  createDate: '2017-01-06T18:59:35.936Z',
  hash: 'ak_test_mik9xi1mCnCQa08H7peAF1J81XqeId',
  id: '17908495',
  name: 'GMB toys',
  status: 'active',
}

const recipientCNPJDataWithRegister = {
  createDate: '2017-01-06T18:59:35.936Z',
  hash: 'ak_test_mik9xi1mCnCQa08H7peAF1J81XqeId',
  id: '17908495',
  name: 'Full Name Company',
  status: 'active',
}

const recipientAnticipationDataUpdated = {
  anticipationDays: '',
  anticipationModel: 'automatic_volume',
  anticipationVolumePercentage: '85',
}

const recipientTransferDataUpdated = {
  transferDay: '5',
  transferEnabled: true,
  transferInterval: 'monthly',
}

const recipientBankAccountDataUpdated = {
  agency: '1234',
  bank: '001',
  id: '17935047',
  name: 'Nome da Conta',
  number: '123',
  type: 'conta_corrente',
}

export const after = {
  recipientCPFData,
  recipientCPFDataWithRegister,
  recipientCNPJData,
  recipientCNPJDataWithRegister,
  recipientAnticipationDataUpdated,
  recipientTransferDataUpdated,
  recipientBankAccountDataUpdated,
}
