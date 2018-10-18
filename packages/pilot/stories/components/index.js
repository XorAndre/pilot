import React from 'react'
import { storiesOf } from '@storybook/react'
import { checkA11y } from '@storybook/addon-a11y'

import SearchableDropdown from './SearchableDropdown'
import BoletoRefundDetails from './BoletoRefundDetails'
import ConfigurationCardForm from './ConfigurationCardForm'
import CaptureDetails from './CaptureDetails'
import CopyButton from './CopyButton'
import CurrencyInput from './CurrencyInput'
import CreditCardRefundDetails from './CreditCardRefundDetails'
import CustomerCard from './CustomerCard'
import DataDisplay from './DataDisplay'
import DetailsHead from './DetailsHead'
import EventList from './EventList'
import ExportData from './ExportData'
import PaymentCards from './PaymentCards'
import Property from './Property'
import Operations from './Operations'
import RecipientSectionState from './RecipientSection'
import RiskLevel from './RiskLevel'
import ReprocessDetails from './ReprocessDetails'
import Summary from './Summary'
import TotalDisplay from './TotalDisplay'
import TransferError from './TransferError'
import TransactionDetailsCard from './TransactionDetailsCard'
import TreeView from './TreeView'
import ApiKeySection from './ApiKey'
import PendingRequests from './PendingRequests'
import BalanceTotalDisplay from './BalanceTotalDisplay'
import BalanceSummary from './BalanceSummary'
import SidebarSections from './SidebarSections'
import SidebarSummary from './SidebarSummary'
import Loader from './Loader'
import Message from './Message'
import MessageActions from './MessageActions'
import PasswordInput from './PasswordInput'
import ConfirmModal from './ConfirmModal'

storiesOf('Components|Custom components', module)
  .addDecorator(checkA11y)
  .add('Searchable Dropdown', () => <SearchableDropdown />)
  .add('Configuration card form', () => <ConfigurationCardForm />)
  .add('Copy button', () => <CopyButton />)
  .add('Currency Input', () => <CurrencyInput />)
  .add('Customer card', () => <CustomerCard />)
  .add('Details head', () => <DetailsHead />)
  .add('Recipient section', () => <RecipientSectionState />)
  .add('Transaction details card', () => <TransactionDetailsCard />)
  .add('Event list', () => <EventList />)
  .add('Export Data', () => <ExportData />)
  .add('DataDisplay', () => <DataDisplay />)
  .add('Reprocess details', () => <ReprocessDetails />)
  .add('Capture Details', () => <CaptureDetails />)
  .add('Payment card', () => <PaymentCards />)
  .add('RiskLevel', () => <RiskLevel />)
  .add('TreeView', () => <TreeView />)
  .add('Property', () => <Property />)
  .add('Boleto Refund Details', () => <BoletoRefundDetails />)
  .add('CreditCardRefundDetails', () => <CreditCardRefundDetails />)
  .add('ApiKey', () => <ApiKeySection />)
  .add('Pending Requests', () => <PendingRequests />)
  .add('Operations', () => <Operations />)
  .add('Balance total display', () => <BalanceTotalDisplay />)
  .add('Balance summary', () => <BalanceSummary />)
  .add('Sidebar Sections', () => <SidebarSections />)
  .add('Sidebar Summary', () => <SidebarSummary />)
  .add('Summary', () => <Summary />)
  .add('Transfer Error', () => <TransferError />)
  .add('Loader', () => <Loader />)
  .add('Message', () => <Message />)
  .add('Message with actions', () => <MessageActions />)
  .add('Password Input', () => <PasswordInput />)
  .add('TotalDisplay', () => <TotalDisplay />)
  .add('Confirm Modal', () => <ConfirmModal />)
