import formatBankAccount from './formatBankAccount'
import beforeFormat from './mocks/beforeFormat.json'
import afterFormat from './mocks/afterFormat.json'

describe('Format Bank account', () => {
  it('formats bank accounts correctly', () => {
    expect(formatBankAccount(beforeFormat)).toEqual(afterFormat)
  })
})
