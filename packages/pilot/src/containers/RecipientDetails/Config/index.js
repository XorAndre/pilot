import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Spacing } from 'former-kit'

import AnticipationIcon from 'emblematic-icons/svg/Undo32.svg'
import TransferIcon from 'emblematic-icons/svg/Transaction32.svg'
import BackAccountIcon from 'emblematic-icons/svg/BankAccount32.svg'
import AnticipationContent from './AnticipationContent'
import TransferContent from './TransferContent'
import BankAccountContent from './BankAccountContent'
import RecipientItem from './RecipientItem'
import HelpModal from './HelpModal'

import {
  userAccountProps,
  userAccountDefaultProps,
} from '../../AddRecipient/BankAccountStep'

import style from './style.css'

class RecipientDetailConfig extends Component {
  constructor (props) {
    super(props)
    this.state = {
      anticipation: this.props.anticipation,
      bankAccount: this.props.bankAccount,
      expanded: {},
      openedModal: false,
      transfer: this.props.transfer,
    }

    this.handleCollapse = this.handleCollapse.bind(this)
    this.handleChangeAnticipation = this.handleChangeAnticipation.bind(this)
    this.handleChangeBankAccount = this.handleChangeBankAccount.bind(this)
    this.handleChangeTransfer = this.handleChangeTransfer.bind(this)
    this.toggleChangeTransfer = this.toggleChangeTransfer.bind(this)
    this.renderAnticipationSub = this.renderAnticipationSub.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSaveAnticipation = this.handleSaveAnticipation.bind(this)
    this.handleSaveTransfer = this.handleSaveTransfer.bind(this)
    this.handleSaveBankAccount = this.handleSaveBankAccount.bind(this)
    this.handleOpenHelpModal = this.handleOpenHelpModal.bind(this)
    this.handleCloseHelpModal = this.handleCloseHelpModal.bind(this)
  }

  handleChangeAnticipation (anticipation) {
    this.setState({
      anticipation,
    })
  }

  handleChangeBankAccount (bankAccount) {
    this.setState({
      bankAccount,
    })
  }

  handleChangeTransfer (transfer) {
    this.setState({
      transfer,
    })
  }

  toggleChangeTransfer () {
    this.setState({
      transfer: {
        ...this.state.transfer,
        transferEnabled: !this.state.transfer.transferEnabled,
      },
    })
  }

  handleCancel () {
    this.setState({
      anticipation: this.props.anticipation,
      bankAccount: this.props.bankAccount,
      expanded: {},
      transfer: this.props.transfer,
    })
  }

  handleSaveAnticipation (data) {
    this.props.handleSaveAnticipation(
      data,
      this.setState({
        expanded: {},
      })
    )
  }

  handleSaveTransfer (data) {
    this.props.handleSaveTransfer(
      data,
      this.setState({
        expanded: {},
      })
    )
  }

  handleSaveBankAccount (data) {
    this.props.handleSaveBankAccount(
      data,
      this.setState({
        expanded: {},
      })
    )
  }

  handleCollapse (id) {
    this.setState({
      expanded: {
        [id]: !this.state.expanded[id],
      },
    })
  }

  handleOpenHelpModal () {
    this.setState({ openedModal: true })
  }

  handleCloseHelpModal () {
    this.setState({ openedModal: false })
  }

  renderAnticipationSub () {
    const {
      anticipation,
      t,
    } = this.props
    const model = t('pages.add_recipient.anticipation_model')
    const volume = t('pages.add_recipient.anticipation_volume')
    const anticipationManual = t('pages.add_recipient.manual_volume')
    const anticipationVolume = t('pages.add_recipient.automatic_volume')
    const anticipation1025 = t('pages.add_recipient.automatic_1025')
    const anticipationDx = t('pages.add_recipient.automatic_dx')
    const HelpButton = (
      <Button
        type="button"
        size="tiny"
        fill="outline"
        onClick={this.handleOpenHelpModal}
      >
        {t('pages.recipient_detail.help')}
      </Button>
    )

    if (anticipation.anticipationModel === 'manual') {
      return (
        <div className={style.alignItems}>
          {`${model}: ${anticipationManual}`}
          <Spacing size="large" />
          {`${volume}: ${anticipation.anticipationVolumePercentage}%`}
          <Spacing size="large" />
          {HelpButton}
        </div>
      )
    }
    if (anticipation.anticipationModel === 'automatic_volume') {
      return (
        <div className={style.alignItems}>
          {`${model}: ${anticipationVolume}`}
          <Spacing size="large" />
          {`${volume}: ${anticipation.anticipationVolumePercentage}%`}
          <Spacing size="large" />
          {HelpButton}
        </div>
      )
    }
    if (anticipation.anticipationModel === 'automatic_1025') {
      return (
        <div className={style.alignItems}>
          {`${model}: ${anticipation1025}`}
          <Spacing size="large" />
          {HelpButton}
        </div>
      )
    }
    if (anticipation.anticipationModel === 'automatic_dx') {
      return (
        <div className={style.alignItems}>
          {`${model}: ${anticipationDx}`}
          <Spacing size="large" />
          {HelpButton}
        </div>
      )
    }
    return null
  }

  renderTransferSub () {
    const {
      t,
      transfer,
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
    )) || {}

    const agency = (selectedAccount.agency_digit)
      ? `${selectedAccount.agency}-${selectedAccount.agency_digit}`
      : selectedAccount.agency

    const number = `${selectedAccount.number}-${selectedAccount.number_digit}`

    return `${selectedAccount.name} - ${selectedAccount.bank} - ${agency} - ${number}`
  }

  render () {
    const {
      accounts,
      t,
    } = this.props
    const {
      anticipation,
      bankAccount,
      openedModal,
      transfer,
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
            onSave={this.handleSaveAnticipation}
            onChange={this.handleChangeAnticipation}
            onCancel={this.handleCancel}
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
            onCancel={this.handleCancel}
            onSave={this.handleSaveTransfer}
            onChange={this.handleChangeTransfer}
            onToggle={this.toggleChangeTransfer}
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
            onChange={this.handleChangeBankAccount}
            onCancel={this.handleCancel}
            onSave={this.handleSaveBankAccount}
            t={t}
          />
        </RecipientItem>
        <HelpModal
          isOpen={openedModal}
          onExit={this.handleCloseHelpModal}
          title={t('pages.recipient_detail.title_modal')}
          t={t}
        />
      </Fragment>
    )
  }
}

RecipientDetailConfig.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  anticipation: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
  }),
  bankAccount: userAccountProps,
  handleSaveAnticipation: PropTypes.func.isRequired,
  handleSaveBankAccount: PropTypes.func.isRequired,
  handleSaveTransfer: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  transfer: PropTypes.shape({
    transferDay: PropTypes.string,
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
  }),
}

RecipientDetailConfig.defaultProps = {
  accounts: [],
  anticipation: {
    anticipationDays: '',
    anticipationModel: '',
    anticipationVolumePercentage: '',
  },
  bankAccount: userAccountDefaultProps,
  transfer: {
    transferDay: '',
    transferEnabled: true,
    transferInterval: '',
  },
}

export default RecipientDetailConfig
