import React from 'react'
import { storiesOf } from '@storybook/react'
import { checkA11y } from '@storybook/addon-a11y'

import AnticipationForm from './Anticipation/Form'
import BankAccountSelector from './Settings/BankAccount/Selector'
import Balance from './Balance'
import BankAccountForm from './Settings/BankAccount/Add'
import AddAccount from './AddRecipient/BankAccountStep/AddAccount'
import BankAccountStep from './AddRecipient/BankAccountStep'
import ConfirmRecipientStep from './AddRecipient/ConfirmStep'
import BoletoForm from './Refund/BoletoForm'
import BoletoRefundConfirm from './Refund/BoletoConfirmation'
import BoletoRefundResult from './Refund/BoletoResult'
import CardConfirmation from './Refund/CardConfirmation'
import CardForm from './Refund/CardForm'
import CardResult from './Refund/CardResult'
import RecipientListState from './RecipientList'

import {
  ManualReviewApproveForm,
  ManualReviewRefuseForm,
} from './ManualReview/Form'

import {
  ManualReviewApproveResult,
  ManualReviewRefuseResult,
  ManualReviewErrorResult,
} from './ManualReview/Result'

import {
  ManualReviewStepApproveConfirmation,
  ManualReviewStepApproveResult,
  ManualReviewStepRefuseConfirmation,
  ManualReviewStepRefuseResult,
  ManualReviewStepResultError,
} from './ManualReview'

import {
  BoletoRefund,
  CreditCardRefund,
} from './Refund'
import Capture from './Capture'
import {
  CaptureFormExample,
  FixedCaptureFormExample,
} from './Capture/Form'
import CaptureResult from './Capture/Result'
import IdentificationStep from './AddRecipient/IdentificationStep'
import BankAccountStep from './AddRecipient/BankAccountStep'
import Reprocess from './Reprocess'
import ReprocessForm from './Reprocess/Form'
import ReprocessResult from './Reprocess/Result'
import SelectAccount from './AddRecipient/BankAccountStep/SelectAccount'
import Withdraw from './Withdraw'
import WithdrawConfirmation from './Withdraw/Confirmation'
import WithdrawForm from './Withdraw/Form'
import WithdrawResultSuccess from './Withdraw/Result/Success'
import WithdrawResultError from './Withdraw/Result/Error'

import {
  AnticipationConfirmationDisabled,
  AnticipationConfirmationWithAutomaticTransfer,
  AnticipationConfirmationWithError,
  AnticipationConfirmationWithoutAutomaticTransfer,
} from './Anticipation/Confirmation'

import {
  AnticipationResultError,
  AnticipationResultWithAutomaticTransfer,
  AnticipationResultWithoutAutomaticTransfer,
} from './Anticipation/Result'

import Anticipation from './Anticipation'
import BoletoConfigurationForm from './Settings/Boleto/Form'
import BankAccount from './Settings/BankAccount'
import ConclusionStepSuccess from './AddRecipient/ConclusionStep/Success'
import ConclusionStepFail from './AddRecipient/ConclusionStep/Fail'

storiesOf('Containers|Bank/Account', module)
  .add('selector', () => <BankAccountSelector />)
  .add('settings', () => <BankAccount />)

storiesOf('Containers|Page containers', module)
  .addDecorator(checkA11y)
  .add('Boleto Configuration Form', () => (
    <BoletoConfigurationForm />
  ))
  .add('Recipient Conclusion Success', () => (
    <ConclusionStepSuccess />
  ))
  .add('Recipient Conclusion Fail', () => (
    <ConclusionStepFail />
  ))
  .add('Anticipation Form', () => (
    <AnticipationForm />
  ))
  .add('Add Account', () => (
    <AddAccount />
  ))
  .add('Recipient Confirm Step', () => (
    <ConfirmRecipientStep />
  ))
  .add('Bank Account Step', () => (
    <BankAccountStep />
  ))
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('Recipient identification step', () => (
    <IdentificationStep />
  ))
  .add('Manual review approve form', () => (
    <ManualReviewApproveForm />
  ))
  .add('Manual review refuse form', () => (
    <ManualReviewRefuseForm />
  ))
  .add('Manual review approve result', () => (
    <ManualReviewApproveResult />
  ))
  .add('Manual review refuse result', () => (
    <ManualReviewRefuseResult />
  ))
  .add('Manual review result error', () => (
    <ManualReviewErrorResult />
  ))
  .add('Manual review step approve confirmation', () => (
    <ManualReviewStepApproveConfirmation />
  ))
  .add('Manual review step approve result', () => (
    <ManualReviewStepApproveResult />
  ))
  .add('Manual review step refuse confirmation', () => (
    <ManualReviewStepRefuseConfirmation />
  ))
  .add('Manual review step refuse result', () => (
    <ManualReviewStepRefuseResult />
  ))
  .add('Manual review step result error', () => (
    <ManualReviewStepResultError />
  ))
  .add('Boleto form', () => (
    <BoletoForm />
  ))
  .add('Boleto refund confirm', () => (
    <BoletoRefundConfirm />
  ))
  .add('Boleto refund result', () => (
    <BoletoRefundResult />
  ))
  .add('Card refund confirmation', () => (
    <CardConfirmation />
  ))
  .add('Card refund result', () => (
    <CardResult />
  ))
  .add('Card refund form', () => (
    <CardForm />
  ))
  .add('Boleto transaction refund', () => (
    <BoletoRefund />
  ))
  .add('Card transaction refund', () => (
    <CreditCardRefund />
  ))
  .add('Balance', () => (
    <Balance />
  ))
  .add('Capture form', () => (
    <CaptureFormExample />
  ))
  .add('Capture form with fixed amount', () => (
    <FixedCaptureFormExample />
  ))
  .add('Capture confirmation', () => (
    <CaptureResult />
  ))
  .add('Capture step identification', () => (
    <Capture
      stepStatus={{
        confirmation: 'pending',
        identification: 'current',
      }}
    />
  ))
  .add('Capture step identification (token)', () => (
    <Capture
      isFromCheckout
      stepStatus={{
        confirmation: 'pending',
        identificaiton: 'current',
      }}
    />
  ))
  .add('Capture step confirmation', () => (
    <Capture
      stepStatus={{
        confirmation: 'current',
        identification: 'success',
      }}
    />
  ))
  .add('Capture step confirmation error', () => (
    <Capture
      stepStatus={{
        confirmation: 'error',
        identification: 'success',
      }}
      statusMessage="An error ocurred!"
    />
  ))
  .add('Reprocess form', () => (
    <ReprocessForm />
  ))
  .add('Reprocess result', () => (
    <ReprocessResult />
  ))
  .add('Reprocess step confirmation', () => (
    <Reprocess
      statusMessage=""
      stepStatus={{
        confirmation: 'current',
        result: null,
      }}
    />
  ))
  .add('Reprocess step result', () => (
    <Reprocess
      statusMessage="Success!"
      stepStatus={{
        confirmation: 'success',
        result: 'current',
      }}
    />
  ))
  .add('Reprocess step result error', () => (
    <Reprocess
      statusMessage="Internal server error"
      stepStatus={{
        confirmation: 'success',
        result: 'error',
      }}
    />
  ))
  .add('Select Account', () => (
    <SelectAccount />
  ))
  .add('Withdraw', () => (
    <Withdraw />
  ))
  .add('WithdrawConfirmation', () => (
    <WithdrawConfirmation />
  ))
  .add('WithdrawForm', () => (
    <WithdrawForm />
  ))
  .add('Withdraw Result Success', () => (
    <WithdrawResultSuccess />
  ))
  .add('Withdraw Result Error', () => (
    <WithdrawResultError />
  ))
  .add('Anticipation Confirmation with automatic transfer', () => (
    <AnticipationConfirmationWithAutomaticTransfer />
  ))
  .add('Anticipation Confirmation without automatic transfer', () => (
    <AnticipationConfirmationWithoutAutomaticTransfer />
  ))
  .add('Anticipation Confirmation with error', () => (
    <AnticipationConfirmationWithError />
  ))
  .add('Anticipation Confirmation disabled', () => (
    <AnticipationConfirmationDisabled />
  ))
  .add('Anticipation Result with automatic transfer', () => (
    <AnticipationResultWithAutomaticTransfer />
  ))
  .add('Anticipation Result without automatic transfer', () => (
    <AnticipationResultWithoutAutomaticTransfer />
  ))
  .add('Anticipation Result error', () => (
    <AnticipationResultError />
  ))
  .add('Anticipation', () => (
    <Anticipation />
  ))
  .add('Bank Account Form', () => (
    <BankAccountForm />
  ))
