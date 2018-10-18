import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, pathOr } from 'ramda'

import { requestLogout } from '../../Account/actions'
import AddRecipient from '../../../../src/containers/AddRecipient'

const getUserPermission =
  pathOr('admin', ['permission'])

const getAnticipationParams =
  pathOr(true, ['anticipation_config', 'config_anticipation_params'])

const getMinimumDelay =
  pathOr(15, ['anticipation_config', 'minimum_delay'])

const getMaximumAnticipationDays =
  pathOr(31, ['anticipation_config', 'max_anticipation_days'])

const mapStateToProps = (state) => {
  const { account } = state
  const { client, company, user } = account || {}

  const userPermission = getUserPermission(user)
  const canConfigureAnticipation = getAnticipationParams(company)
  const minimumAnticipationDelay = getMinimumDelay(company)
  const maximumAnticipationDays = getMaximumAnticipationDays(company)

  const options = {
    canConfigureAnticipation,
    maximumAnticipationDays,
    minimumAnticipationDelay,
    userPermission,
  }

  return {
    client,
    options,
  }
}

const mapDispatchToProp = ({
  redirectToLoginPage: requestLogout,
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProp),
  translate(),
  withRouter
)

class AddRecipientPage extends Component {
  constructor (props) {
    super(props)

    this.fetchAccounts = this.fetchAccounts.bind(this)
    this.onExit = this.onExit.bind(this)
    this.onLoginAgain = this.onLoginAgain.bind(this)
    this.onViewDetails = this.onViewDetails.bind(this)
    this.submitRecipient = this.submitRecipient.bind(this)
  }

  onExit () {
    this.props.history.replace('/recipients')
  }

  onLoginAgain () {
    this.props.redirectToLoginPage()
  }

  onViewDetails (recipientId) {
    this.props.history.replace(`/recipients/details/${recipientId}`)
  }

  submitRecipient (recipient) {
    const { client, options } = this.props
    return client.recipient.add(recipient, options)
  }

  fetchAccounts (document) {
    return this.props.client.recipient.bankAccount(document)
  }

  render () {
    return (
      <AddRecipient
        fetchAccounts={this.fetchAccounts}
        onExit={this.onExit}
        onLoginAgain={this.onLoginAgain}
        onViewDetails={this.onViewDetails}
        options={this.props.options}
        submitRecipient={this.submitRecipient}
        t={this.props.t}
      />
    )
  }
}

AddRecipientPage.propTypes = {
  client: PropTypes.shape({
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  options: PropTypes.shape({
    canConfigureAnticipation: PropTypes.bool,
    maximumAnticipationDays: PropTypes.number,
    minimumAnticipationDelay: PropTypes.number,
    userPermission: PropTypes.string,
  }).isRequired,
  redirectToLoginPage: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(AddRecipientPage)
