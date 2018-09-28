const formatBankAccount = (foundBankAccounts) => {
  const accounts = foundBankAccounts.map(account => ({
    name: account.legal_name,
    number: account.conta,
    number_digit: account.conta_dv,
    type: account.type,
    agency: account.agencia,
    agency_digit: account.agencia_dv || '',
    bank: account.bank_code,
    id: account.id.toString(),
  }))

  return { accounts }
}

export default formatBankAccount
