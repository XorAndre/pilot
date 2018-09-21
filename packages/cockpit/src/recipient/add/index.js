import formatToRecipient from './formatToRecipient'

const AddRecipient = client => (data) => {
  const recipient = formatToRecipient(data)
  return client.recipients.create(recipient)
}

export default AddRecipient
