import { formatHeaderData } from './formatRecipient'

const mountPartners = (previousState, partner, index) => ({
  ...previousState,
  [`partner${index}`]: {
    cpf: partner.document_number,
    name: partner.name,
    email: partner.email,
  },
})

const getPartnersData = partners => partners.reduce(mountPartners, {})

const formatAnticipation = (data) => {
  const anticipation = {
    anticipationDays: data.automatic_anticipation_days,
    anticipationModel: '',
    anticipationVolumePercentage: data
      .anticipatable_volume_percentage.toString(),
  }

  if (data.automatic_anticipation_type === 'full' &&
      data.automatic_anticipation_enabled) {
    anticipation.anticipationModel = 'automatic_volume'
  } else if (data.automatic_anticipation_type === '1025' &&
      data.automatic_anticipation_enabled) {
    anticipation.anticipationModel = 'automatic_dx'
  } else if (data.automatic_anticipation_type === '1025' &&
      data.automatic_anticipation_1025_delay === 15) {
    anticipation.anticipationModel = 'automatic_1025'
  } else if (data.automatic_anticipation_type === 'full' &&
      data.automatic_anticipation_enabled === false) {
    anticipation.anticipationModel = 'manual'
  }

  return anticipation
}

function formatAntecipationAndTransferConfiguration (data) {
  const companyData = formatHeaderData(data)
  let identification = {
    cnpj: '',
    cnpjEmail: '',
    cnpjInformation: false,
    cnpjName: '',
    cnpjPhone: '',
    cnpjUrl: '',
    cpf: '',
    cpfEmail: '',
    cpfInformation: false,
    cpfName: '',
    cpfPhone: '',
    cpfUrl: '',
    documentType: data.bank_account.document_type,
  }
  if (data.bank_account.document_type === 'cpf' && data.register_information) {
    identification = {
      ...identification,
      cpf: data.bank_account.document_number,
      cpfEmail: data.register_information.email,
      cpfInformation: true,
      cpfName: data.register_information.name,
      cpfPhone: data.register_information.phone_numbers[0].number,
      cpfUrl: data.register_information.site_url,
      documentType: 'cpf',
    }
  } else {
    identification = {
      ...identification,
      cpf: data.bank_account.document_number,
      cpfInformation: false,
    }
  }


  if (data.bank_account.document_type === 'cnpj' && data.register_information) {
    const partnersData = getPartnersData(data
      .register_information.managing_partners)
    identification = {
      ...identification,
      cnpj: data.bank_account.document_number,
      cnpjEmail: data.register_information.email,
      cnpjInformation: true,
      cnpjName: data.register_information.company_name,
      cnpjPhone: data.register_information.phone_numbers[0].number,
      cnpjUrl: data.register_information.site_url,
      documentType: 'cnpj',
      partnerNumber: data
        .register_information.managing_partners.length.toString(),
      ...partnersData,
    }
  } else {
    identification = {
      ...identification,
      cnpj: data.bank_account.document_number,
      cnpjInformation: false,
    }
  }

  const configuration = {
    anticipationModel: data.automatic_anticipation_type,
    anticipationVolumePercentage: data
      .anticipatable_volume_percentage.toString(),
    anticipationDays: data.automatic_anticipation_days,
    transferEnabled: data.transfer_enabled,
    transferInterval: data.transfer_interval,
    transferDay: data.transfer_day.toString(),
  }

  const transfer = {
    transferDay: data.transfer_day.toString(),
    transferEnabled: data.transfer_enabled,
    transferInterval: data.transfer_interval,
  }

  if (data.transfer_interval === 'daily') {
    configuration.transferDay = '0'
    transfer.transferDay = '0'
  }
  if (data.transfer_interval === 'weekly') {
    configuration.transferDay = data.transfer_day.toString()
    transfer.transferDay = data.transfer_day.toString()
  }

  const informationData = {
    identification,
    configuration,
    bankAccount: {
      agency_digit: data.bank_account.agencia_dv,
      agency: data.bank_account.agencia,
      bank: data.bank_account.bank_code,
      name: data.bank_account.legal_name,
      number_digit: data.bank_account.conta_dv,
      number: data.bank_account.conta,
      type: data.bank_account.type,
    },
  }

  const anticipation = formatAnticipation(data)

  const configurationData = {
    anticipation,
    transfer,
    bankAccount: {
      name: data.bank_account.legal_name,
      number: data.bank_account.conta.toString(),
      type: data.bank_account.type,
      agency: data.bank_account.agencia,
      bank: data.bank_account.bank_code,
      id: data.bank_account.id.toString(),
    },
  }

  const formattedData = {
    companyData,
    informationData,
    configurationData,
  }

  return formattedData
}

export default formatAntecipationAndTransferConfiguration
