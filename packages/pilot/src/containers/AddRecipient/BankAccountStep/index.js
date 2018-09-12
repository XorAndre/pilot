import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { SegmentedSwitch, CardContent } from 'former-kit'

import {
  complement,
  either,
  isEmpty,
  isNil,
} from 'ramda'

import AddAccount from './AddAccount'
import SelectAccount from './SelectAccount'
import accountTypes from '../../../models/accountTypes'

const hasItems = complement(either(isEmpty, isNil))

const isNewAccount = account => (
  !account.id &&
  account.account_number !== ''
)

const ADD_ACCOUNT = 'addAccount'
const SELECT_ACCOUNT = 'selectAccount'

class BankAccountStep extends Component {
  constructor (props) {
    super(props)
    const { data } = props
    let selectedForm = SELECT_ACCOUNT

    if (isNewAccount(data)) {
      selectedForm = ADD_ACCOUNT
    }

    this.state = { selectedForm }
    this.handleFormSelectionChange = this.handleFormSelectionChange.bind(this)
  }

  handleFormSelectionChange (selectedForm) {
    this.setState({ selectedForm })
  }

  renderSelectedForm () {
    const { selectedForm } = this.state
    const { data } = this.props

    if (selectedForm === ADD_ACCOUNT) {
      let addAccountData
      if (isNewAccount(data)) addAccountData = data
      return <AddAccount {...this.props} data={addAccountData} />
    }

    return <SelectAccount {...this.props} />
  }

  render () {
    const {
      accounts,
      t,
    } = this.props

    const displaySelectAccount = hasItems(accounts)

    if (displaySelectAccount) {
      return (
        <Fragment>
          <CardContent>
            <strong>{t('pages.add_recipient.bank_account')}</strong>
            <p>{t('pages.add_recipient.select_or_add_account')}</p>
            <SegmentedSwitch
              options={[
                {
                  title: t('pages.add_recipient.select_account'),
                  value: SELECT_ACCOUNT,
                },
                {
                  title: t('pages.add_recipient.add_account'),
                  value: ADD_ACCOUNT,
                },
              ]}
              onChange={this.handleFormSelectionChange}
              name="select_form"
              value={this.state.selectedForm}
            />
          </CardContent>
          { this.renderSelectedForm() }
        </Fragment>
      )
    }

    return (
      <Fragment>
        <CardContent>
          <strong>{t('pages.add_recipient.bank_account')}</strong>
          <p>{t('pages.add_recipient.add_new_account')}</p>
        </CardContent>
        <AddAccount {...this.props} />
      </Fragment>
    )
  }
}

const accountShape = PropTypes.shape({
  account_name: PropTypes.string,
  account_number: PropTypes.string,
  account_type: PropTypes.oneOf(accountTypes),
  agency: PropTypes.string,
  bank: PropTypes.string,
  id: PropTypes.string,
})

BankAccountStep.propTypes = {
  accounts: PropTypes.arrayOf(accountShape),
  data: accountShape,
  errors: PropTypes.shape({
    account_name: PropTypes.string,
    account_number: PropTypes.string,
    account_type: PropTypes.string,
    agency: PropTypes.string,
    bank: PropTypes.string,
  }),
  onContinue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

BankAccountStep.defaultProps = {
  accounts: [],
  data: {
    account_name: '',
    account_number: '',
    account_type: 'conta_corrente',
    agency: '',
    bank: '',
  },
  errors: {},
}

export default BankAccountStep
