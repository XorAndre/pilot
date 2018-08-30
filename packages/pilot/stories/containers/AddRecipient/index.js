import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import AddRecipient from '../../../src/containers/AddRecipient'

import {
  submitRecipient,
  submitRecipientError,
  fetchAccounts,
  fetchAccountsEmpty,
  fetchAccountsError,
} from './mocks'

const props = {
  fetchAccounts,
  onExit: action('Exit'),
  onViewDetails: action('Recipient Details'),
  submitRecipient,
  t: t => t,
}

export const AddRecipientSuccess = () => (
  <Section>
    <AddRecipient {...props} />
  </Section>
)

export const AddRecipientSuccessNoAccounts = () => (
  <Section>
    <AddRecipient {...props} fetchAccounts={fetchAccountsEmpty} />
  </Section>
)

export const AddRecipientFetchError = () => (
  <Section>
    <AddRecipient {...props} fetchAccounts={fetchAccountsError} />
  </Section>
)

export const AddRecipientSubmitError = () => (
  <Section>
    <AddRecipient {...props} submitRecipient={submitRecipientError} />
  </Section>
)
