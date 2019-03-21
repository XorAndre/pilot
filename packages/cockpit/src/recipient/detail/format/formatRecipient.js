export function formatHeaderData (data) {
  const headerData = {
    createDate: data.date_created,
    hash: data.id,
    id: data.bank_account.id.toString(),
    name: data.bank_account.legal_name,
    status: data.status,
  }

  const register = data.register_information

  if (register) {
    if (register.type === 'individual') {
      headerData.name = register.name
    }

    if (register.type === 'corporation') {
      headerData.name = register.company_name
    }
  }

  return headerData
}

export function formatAnticipationData (data) {
  const anticipation = {
    anticipationDays: data.automatic_anticipation_days || '',
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

export function formatTransferData (data) {
  const transfer = {
    transferDay: data.transfer_day.toString(),
    transferEnabled: data.transfer_enabled,
    transferInterval: data.transfer_interval,
  }

  if (data.transfer_interval === 'daily') {
    transfer.transferDay = '0'
  }
  if (data.transfer_interval === 'weekly') {
    transfer.transferDay = data.transfer_day.toString()
  }

  return transfer
}

export function formatBankAccountData (data) {
  const accountFormat = {
    agency: data.agencia,
    bank: data.bank_code,
    id: data.id.toString(),
    name: data.legal_name,
    number: data.conta,
    type: data.type,
  }

  return accountFormat
}
