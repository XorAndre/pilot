import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'

import {
  assocPath,
  compose,
  pipe,
} from 'ramda'

import moment from 'moment'
import mock from '../../../../src/containers/Balance/mock.json'

import DetailRecipient from '../../../../src/containers/RecipientDetails'

const mockBalance = {
  anticipation: {
    available: 10000,
    error: false,
    loading: false,
  },
  currentPage: 1,
  dates: {
    end: moment().add(1, 'month'),
    start: moment(),
  },
  disabled: false,
  onAnticipationClick: () => {},
  onCancel: () => {},
  onCancelRequestClick: () => {},
  onFilterClick: () => {},
  onPageChange: () => {},
  onSave: () => {},
  onWithdrawClick: () => {},
  ...mock.result,
  query: {
    dates: {
      end: moment().add(1, 'month'),
      start: moment(),
    },
    page: 1,
  },
  total: {
    net: 1000000,
    outcoming: 1000000,
    outgoing: 1000000,
  },
}

const mapStateToProps = (state = {}) => {
  const { account } = state
  const { client } = account || {}
  return { client }
}

const enhanced = compose(
  connect(mapStateToProps),
  translate(),
  withRouter
)

class DetailRecipientPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
      loading: true,
      recipientData: {},
    }

    this.handleSaveAnticipation = this.handleSaveAnticipation.bind(this)
    this.handleSaveBankAccount = this.handleSaveBankAccount.bind(this)
    this.handleSaveBankAccountWithBank =
      this.handleSaveBankAccountWithBank.bind(this)
    this.handleSaveBankAccountWithId =
      this.handleSaveBankAccountWithId.bind(this)
    this.handleSaveTransfer = this.handleSaveTransfer.bind(this)
    this.requestClient = this.requestClient.bind(this)
  }

  componentDidMount () {
    this.requestClient()
  }

  handleSaveAnticipation (data) {
    const { client } = this.props
    const { id } = this.props.match.params
    return client.recipient.update(id, { configuration: data })
      .then(() => {
        const updatedAnticipationConfig = assocPath(
          [
            'recipientData',
            'configurationData',
            'anticipation',
          ],
          data,
          this.state
        )
        this.setState(updatedAnticipationConfig)
      })
  }

  handleSaveTransfer (data) {
    const { client } = this.props
    const { id } = this.props.match.params

    return client.recipient.update(id, {
      configuration: {
        ...data,
        anticipationModel: null,
      },
    })
      .then(() => {
        const updatedTrasnferConfig = assocPath(
          [
            'recipientData',
            'configurationData',
            'transfer'],
          data,
          this.state
        )
        this.setState(updatedTrasnferConfig)
      })
  }

  handleSaveBankAccountWithId (data) {
    const { client } = this.props
    const { id } = this.props.match.params

    return client.recipient.update(id, { configuration: data })
  }

  handleSaveBankAccountWithBank (data) {
    const { client } = this.props
    const { id } = this.props.match.params

    const { identification } = this.state.recipientData.informationData
    const { documentType } = identification

    return client.recipient.createNewAccount({
      bankAccount: data,
      identification: {
        documentType,
        [documentType]: this.state.recipientData
          .informationData.identification[documentType],
      },
    })
      .then((bankAccountCreated) => {
        const { accounts } = this.state.recipientData.configurationData
        this.setState({
          recipientData: {
            ...this.state.recipientData,
            configurationData: {
              ...this.state.recipientData.configurationData,
              accounts: [...accounts, bankAccountCreated],
            },
          },
        })

        return client.recipient.update(id, {
          configuration: {
            id: bankAccountCreated.id,
          },
        })
      })
  }

  handleSaveBankAccount (data) {
    let operation = Promise.resolve()

    if (data.id) {
      operation = this.handleSaveBankAccountWithId(data)
    } else if (data.bank) {
      operation = this.handleSaveBankAccountWithBank(data)
    }
    return operation
      .then((dataUpdated) => {
        this.setState(pipe(
          assocPath(
            ['recipientData', 'configurationData', 'bankAccount'],
            dataUpdated.bank_account
          ),
          assocPath(
            ['recipientData', 'companyData', 'name'],
            dataUpdated.bank_account.name
          )
        ))
      })
  }

  requestClient () {
    const { client } = this.props
    const { id } = this.props.match.params

    return client.recipient.detail(id)
      .then((recipient) => {
        const { identification } = recipient.informationData
        const accountsPromise = client.recipient.bankAccount(identification)

        return Promise.all([recipient, accountsPromise])
      })
      .then(([recipient, bankAccounts]) => {
        const { accounts } = bankAccounts
        const accountsPath = ['configurationData', 'accounts']
        const addAccounts = assocPath(accountsPath, accounts)
        const recipientWithAccounts = addAccounts(recipient)

        this.setState({
          loading: false,
          recipientData: recipientWithAccounts,
        })
      })
  }

  render () {
    const {
      error,
      loading,
      recipientData,
    } = this.state

    if (loading || error) return null

    const {
      companyData,
      configurationData,
      informationData,
    } = recipientData

    const { t } = this.props

    return (
      <DetailRecipient
        informationProps={informationData}
        balanceProps={mockBalance}
        configurationProps={{
          ...configurationData,
          handleSaveAnticipation: this.handleSaveAnticipation,
          handleSaveBankAccount: this.handleSaveBankAccount,
          handleSaveTransfer: this.handleSaveTransfer,
        }}
        recipient={companyData}
        t={t}
      />
    )
  }
}

DetailRecipientPage.propTypes = {
  client: PropTypes.shape({
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(DetailRecipientPage)
