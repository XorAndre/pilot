import {
  formatHeaderData,
  formatAnticipationData,
  formatTransferData,
  formatBankAccountData,
} from './formatRecipient'

import { before, after } from './mocks'

describe('Format recipient details header', () => {
  it('Formats individual header data correctly', () => {
    expect(formatHeaderData(before
      .recipientCPF))
      .toEqual(after.recipientCPFData)
  })

  it('Formats individual header data correctly with register information', () => {
    expect(formatHeaderData(before
      .recipientCPFWithRegister))
      .toEqual(after.recipientCPFDataWithRegister)
  })

  it('Formats company header data correctly', () => {
    expect(formatHeaderData(before
      .recipientCNPJ))
      .toEqual(after.recipientCNPJData)
  })

  it('Formats company header data correctly with register information', () => {
    expect(formatHeaderData(before
      .recipientCNPJWithRegister))
      .toEqual(after.recipientCNPJDataWithRegister)
  })

  it('Formats anticipation data correctly after update', () => {
    expect(formatAnticipationData(before
      .recipientAnticipationData))
      .toEqual(after.recipientAnticipationDataUpdated)
  })

  it('Formats transfer data correctly after update', () => {
    expect(formatTransferData(before
      .recipientTransferData))
      .toEqual(after.recipientTransferDataUpdated)
  })

  it('Formats bankAccount data correctly after update', () => {
    expect(formatBankAccountData(before
      .recipientBankAccountData))
      .toEqual(after.recipientBankAccountDataUpdated)
  })
})
