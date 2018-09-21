import formatToRecipient from './formatToRecipient'
import beforeFormat from './mocks/beforeFormat.json'
import afterFormat from './mocks/afterFormat.json'

// TODO: add more tests
describe('Format To Recipient', () => {
  it('formats data correctly', () => {
    expect(formatToRecipient(beforeFormat)).toEqual(afterFormat)
  })
})
