import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import {
  compose,
  assocPath,
  pipe,
} from 'ramda'

import moment from 'moment'
import mock from '../../../../src/containers/Balance/mock.json'

import DetailRecipient from '../../../../src/containers/RecipientDetails'

const mockBalance = {
  ...mock.result,
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

const mapStateToProps = (state) => {
  const { account } = state
  const { client } = account

  return {
    client,
  }
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
      loading: true,
    }

    this.fetchAccounts = this.fetchAccounts.bind(this)
    this.requestClient = this.requestClient.bind(this)
    this.handleSaveAnticipation = this.handleSaveAnticipation.bind(this)
    this.handleSaveTransfer = this.handleSaveTransfer.bind(this)
    this.handleSaveBankAccount = this.handleSaveBankAccount.bind(this)
    this.handleSaveBankAccountWithId =
      this.handleSaveBankAccountWithId.bind(this)
    this.handleSaveBankAccountWithBank =
      this.handleSaveBankAccountWithBank.bind(this)
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

    return client.recipient.update(id, { configuration: data })
      .then(() => {
        const updatedTrasnferConfig = assocPath(
          [
            'recipientData',
            'configurationData',
            'transfer',
          ],
          data,
          this.state
        )
        this.setState(updatedTrasnferConfig)
      })
  }

  handleSaveBankAccountWithId (getData) {
    const { client } = this.props
    const { id } = this.props.match.params

    return client.recipient.update(id, { configuration: getData })
  }

  handleSaveBankAccountWithBank (getData) {
    const { client } = this.props
    const { id } = this.props.match.params

    const { identification } = this.state.recipientData.informationData
    const { documentType } = identification

    return client.recipient.createNewAccount({
      bankAccount: getData,
      identification: {
        documentType,
        [documentType]: this.state.recipientData
          .informationData.identification[documentType],
      },
    })
      .then((bankAccountCreated) => {
        const { accounts } = this.state.recipientData.configurationData
        this.setState({
          ...this.state,
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

  handleSaveBankAccount (getData) {
    let operation = Promise.resolve()

    if (getData.id) {
      operation = this.handleSaveBankAccountWithId(getData)
    } else if (getData.bank) {
      operation = this.handleSaveBankAccountWithBank(getData)
    }
    return operation
      .then((data) => {
        this.setState(pipe(
          assocPath(
            ['recipientData', 'configurationData', 'bankAccount'],
            data.bank_account
          ),
          assocPath(
            ['recipientData', 'companyData', 'name'],
            data.bank_account.name
          )
        ))
      })
  }

  fetchAccounts (document) {
    return this.props.client.recipient.bankAccount(document)
  }

  requestClient () {
    const { client } = this.props
    const { id } = this.props.match.params

    client.recipient.detail(id)
      .then((recipient) => {
        const recipientIdentification = recipient.informationData.identification

        return Promise.all([
          recipient,
          this.fetchAccounts(recipientIdentification),
        ])
      })
      .then(([recipient, { accounts }]) => {
        const recipientWithAccounts = assocPath(
          ['configurationData', 'accounts'],
          accounts,
          recipient
        )
        this.setState({
          recipientData: recipientWithAccounts,
        })
      })
      .catch((error) => {
        this.setState({
          error,
          loading: false,
        })
      })
  }

  render () {
    if (this.state.recipientData) {
      return (
        <DetailRecipient
          informationProps={this.state.recipientData.informationData}
          balanceProps={mockBalance}
          configurationProps={{
            ...this.state.recipientData.configurationData,
            handleSaveAnticipation: this.handleSaveAnticipation,
            handleSaveBankAccount: this.handleSaveBankAccount,
            handleSaveTransfer: this.handleSaveTransfer,
          }}
          recipient={this.state.recipientData.companyData}
          t={this.props.t}
        />
      )
    }
    return null
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
