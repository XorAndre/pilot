import formatBankAccount from './formatBankAccount'

const bankAccount = client => (documentData) => {
  const document = documentData[documentData.documentType]
  const documentNumber = document.replace(/\D/g, '')
  const query = { document_number: documentNumber, count: 50 }

  return client.bankAccounts.all(query)
    .then(formatBankAccount)
}

export default bankAccount
