import format from './format'
import {
  formatToAnticipation,
  formatToTransfer,
  formatToBankAccount,
} from '../add/recipientBuilders'

import formatBankAccount from '../account/formatBankAccount'

const DetailRecipient = client => recipientId => (
  client.recipients.find({ id: recipientId })
    .then(recipient => (format(recipient)))
)

const formatRecipient = recipient => ({
  ...recipient,
  bank_account: formatBankAccount([recipient.bank_account]).accounts[0],
})

const UpdateDetailRecipient = client => (recipientId, data) => {
  if (data.configuration.anticipationModel) {
    return client.recipients.update({
      id: recipientId,
      ...formatToAnticipation(data),
    })
  }
  if (data.configuration.transferInterval) {
    return client.recipients.update({
      id: recipientId,
      ...formatToTransfer(data),
    })
  }
  if (data.configuration.id) {
    return client.recipients.update({
      id: recipientId,
      ...formatToBankAccount(data),
    })
      .then(formatRecipient)
  }
  return client.recipients.update({
    id: recipientId,
    ...formatToAnticipation(data),
    ...formatToTransfer(data),
    ...formatToBankAccount(data),
  })
    .then(formatRecipient)
}

const AddNewBankAccount = client => (data) => {
  const newAccount = formatToBankAccount(data)
  return client.bankAccounts.create(newAccount.bank_account)
    .then(bankAccountCreated =>
      formatBankAccount([bankAccountCreated]).accounts[0])
}

export default {
  detail: DetailRecipient,
  update: UpdateDetailRecipient,
  createNewAccount: AddNewBankAccount,
}
