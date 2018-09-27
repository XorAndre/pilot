import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import AddRecipient from '../../../../src/containers/AddRecipient'

const mapStateToProps = (state) => {
  const { account } = state
  const { client, company } = account
  const { anticipation_config: anticipationConfig } = company || {}

  let {
    config_anticipation_params: anticipation,
    minimum_delay: delay,
  } = anticipationConfig || {}

  if (anticipation === undefined) anticipation = true
  if (delay === undefined) delay = 15

  const options = {
    canConfigureAnticipation: anticipation,
    minimumAnticipationDays: delay,
  }

  return {
    client,
    options,
  }
}

const enhanced = compose(
  connect(mapStateToProps),
  translate(),
  withRouter
)

class AddRecipientPage extends Component {
  constructor (props) {
    super(props)

    this.fetchAccounts = this.fetchAccounts.bind(this)
    this.onExit = this.onExit.bind(this)
    this.onViewDetails = this.onViewDetails.bind(this)
    this.submitRecipient = this.submitRecipient.bind(this)
  }

  onExit () {
    this.props.history.replace('/recipients')
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
  options: PropTypes.shape({
    canConfigureAnticipation: PropTypes.bool,
    minimumAnticipationDays: PropTypes.number,
  }).isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
}

export default enhanced(AddRecipientPage)
