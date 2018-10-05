import { formatToRecipient } from './recipientBuilders'

const AddRecipient = client => (data, options) => {
  const recipient = formatToRecipient(data, options)
  return client.recipients.create(recipient)
}

export default AddRecipient
