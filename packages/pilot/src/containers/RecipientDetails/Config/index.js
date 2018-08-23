import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Spacing } from 'former-kit'
import AnticipationIcon from 'emblematic-icons/svg/Undo32.svg'
import TransferIcon from 'emblematic-icons/svg/Transaction32.svg'
import BackAccountIcon from './BankAccount32.svg'
import AnticipationContent from './AnticipationContent'
import TransferContent from './TransferContent'
import BankAccountContent from './BankAccountContent'
import RecipientItem from './RecipientItem'
import {
  TRANSFER,
  ANTICIPATION,
  BANK_ACCOUNT,
} from './contentIds'

class RecipientDetailConfig extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: {},
      anticipation: props.anticipation,
      transfer: props.transfer,
      bankAccount: props.bankAccount,
    }

    this.handleCollapse = this.handleCollapse.bind(this)
    this.onChangeAnticipationHandler = this.onChangeAnticipationHandler.bind(this)
    this.onChangeBankAccountHandler = this.onChangeBankAccountHandler.bind(this)
    this.onChangeTransferHandler = this.onChangeTransferHandler.bind(this)
    this.onChangeTransferToggle = this.onChangeTransferToggle.bind(this)
    this.renderAnticipationSub = this.renderAnticipationSub.bind(this)
  }

  onChangeAnticipationHandler (anticipation) {
    this.setState({
      anticipation,
    })
  }

  onChangeBankAccountHandler (bankAccount) {
    this.setState({
      bankAccount,
    })
  }

  onChangeTransferHandler (transfer) {
    this.setState({
      transfer,
    })
  }

  onChangeTransferToggle () {
    this.setState({
      transfer: {
        ...this.state.transfer,
        transferEnabled: !this.state.transfer.transferEnabled,
      },
    })
  }

  handleCollapse (id) {
    this.setState({
      expanded: {
        [id]: !this.state.expanded[id],
      },
    })
  }

  renderAnticipationSub () {
    const {
      anticipation,
      t,
    } = this.props
    const model = t('pages.add_recipient.anticipation_model')
    const volume = t('pages.add_recipient.anticipation_volume')
    const anticipationManual = t('pages.add_recipient.manual_volume')
    const anticipationVolume = t('pages.add_recipient.anticipation_volume')
    const anticipation1025 = t('pages.add_recipient.automatic_1025')
    const anticipationDx = t('pages.add_recipient.automatic_dx')

    if (anticipation.anticipationModel === 'manual') {
      return (
        <Fragment>
          {`${model}: ${anticipationManual}`}
          <Spacing size="large" />
          {`${volume}: ${anticipation.anticipationVolumePercentage}%`}
        </Fragment>
      )
    }
    if (anticipation.anticipationModel === 'automatic_volume') {
      return (
        <Fragment>
          {`${model}: ${anticipationVolume}`}
          <Spacing size="large" />
          {`${volume}: ${anticipation.anticipationVolumePercentage}%`}
        </Fragment>
      )
    }
    if (anticipation.anticipationModel === 'automatic_1025') {
      return `${model}: ${anticipation1025}`
    }
    if (anticipation.anticipationModel === 'automatic_dx') {
      return `${model}: ${anticipationDx}`
    }
    return null
  }

  renderTransferSub () {
    const {
      transfer,
      t,
    } = this.props
    const transferSub = t('pages.add_recipient.automatic_transfer')
    if (transfer.transferEnabled === true) {
      return (
        `${transferSub}: ${t('pages.recipient_detail.enabled')}`
      )
    }
    return (
      `${transferSub}: ${t('pages.recipient_detail.disabled')}`
    )
  }

  renderBankAccountSub () {
    const {
      accounts,
      bankAccount,
    } = this.props

    if (!bankAccount.id) {
      bankAccount.id = accounts[0].id
    }
    const selectedAccount = accounts.find(account => (
      account.id === bankAccount.id
    ))

    return (
      `${selectedAccount.account_name} - ${selectedAccount.bank} - ${selectedAccount.agency} - ${selectedAccount.account_number}`
    )
  }

  render () {
    const {
      accounts,
      onCancel,
      onSave,
      t,
    } = this.props
    const {
      anticipation,
      transfer,
      bankAccount,
    } = this.state
    return (
      <Fragment>
        <RecipientItem
          title={t('pages.recipient_detail.anticipation')}
          subtitle={this.renderAnticipationSub()}
          icon={<AnticipationIcon width={16} height={16} />}
          collapsed={this.state.expanded.anticipation}
          onClick={this.handleCollapse}
          id="anticipation"
        >
          <AnticipationContent
            data={anticipation}
            t={t}
            onCancel={onCancel}
            onSave={ainticipationData => onSave(ainticipationData, ANTICIPATION)}
            onChange={this.onChangeAnticipationHandler}
          />
        </RecipientItem>
        <RecipientItem
          title={t('pages.recipient_detail.transfer')}
          subtitle={this.renderTransferSub()}
          icon={<TransferIcon width={16} height={16} />}
          collapsed={this.state.expanded.transfer}
          onClick={this.handleCollapse}
          id="transfer"
        >
          <TransferContent
            data={transfer}
            t={t}
            onCancel={onCancel}
            onSave={transferData => onSave(transferData, TRANSFER)}
            onChange={this.onChangeTransferHandler}
            onToggle={this.onChangeTransferToggle}
          />
        </RecipientItem>
        <RecipientItem
          title={t('pages.recipient_detail.bank_account')}
          subtitle={this.renderBankAccountSub()}
          icon={<BackAccountIcon width={16} height={16} />}
          collapsed={this.state.expanded.bankAccount}
          onClick={this.handleCollapse}
          id="bankAccount"
        >
          <BankAccountContent
            accounts={accounts}
            data={bankAccount}
            onChange={this.onChangeBankAccountHandler}
            onCancel={onCancel}
            onSave={bankAccountData => onSave(bankAccountData, BANK_ACCOUNT)}
            t={t}
          />
        </RecipientItem>
      </Fragment>
    )
  }
}

RecipientDetailConfig.propTypes = {
  anticipation: PropTypes.shape({
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    anticipationDays: PropTypes.string,
  }),
  transfer: PropTypes.shape({
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
    transferDay: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
  bankAccount: PropTypes.shape({
    addAccount: PropTypes.shape({
      account_name: PropTypes.string,
      account_number: PropTypes.string,
      account_type: PropTypes.string,
      agency: PropTypes.string,
      bank: PropTypes.string,
    }),
    selectAccount: PropTypes.shape({
      account_id: PropTypes.string,
    }),
  }),
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

RecipientDetailConfig.defaultProps = {
  accounts: [],
  anticipation: {
    anticipationModel: '',
    anticipationVolumePercentage: '',
    anticipationDays: '',
  },
  transfer: {
    transferEnabled: true,
    transferInterval: '',
    transferDay: '',
    transferWeekday: '',
  },
  bankAccount: {
    addAccount: {
      account_name: '',
      account_number: '',
      account_type: 'conta_corrente',
      agency: '',
      bank: '',
    },
    selectAccount: {
      id: '1',
    },
  },
}

export default RecipientDetailConfig
