import { formatToRecipient, formatToBankAccount } from './recipientBuilders'
import beforeFormat from './mocks/beforeFormat.json'
import afterFormat from './mocks/afterFormat.json'
import beforeBankFormat from './mocks/beforeBankFormat.json'
import afterBankFormat from './mocks/afterBankFormat.json'
import beforeBankFormatID from './mocks/beforeBankFormatID.json'
import afterBankFormatID from './mocks/afterBankFormatID.json'

describe('Format To Recipient', () => {
  it('formats data correctly', () => {
    expect(formatToRecipient(beforeFormat)).toEqual(afterFormat)
  })
  it('format bank accounts', () => {
    expect(formatToBankAccount(beforeBankFormat)).toEqual(afterBankFormat)
  })
  it('format bank accounts with ID', () => {
    expect(formatToBankAccount(beforeBankFormatID)).toEqual(afterBankFormatID)
  })
})
