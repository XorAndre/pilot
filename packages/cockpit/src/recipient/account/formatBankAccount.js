const formatBankAccount = (foundBankAccounts) => {
  const accounts = foundBankAccounts.map(account => ({
    name: account.legal_name,
    number: account.conta + account.conta_dv,
    type: account.type,
    agency: account.agencia,
    bank: account.bank_code,
    id: account.id.toString(),
  }))

  return { accounts }
}

export default formatBankAccount
