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

const hasItems = complement(either(isEmpty, isNil))

const ADD_ACCOUNT = 'addAccount'
const SELECT_ACCOUNT = 'selectAccount'

export default class BankAccountStep extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedForm: SELECT_ACCOUNT,
    }

    this.handleFormSelectionChange = this.handleFormSelectionChange.bind(this)
  }

  handleFormSelectionChange (selectedForm) {
    this.setState({ selectedForm })
  }

  renderSelectedForm () {
    const { selectedForm } = this.state

    if (selectedForm === ADD_ACCOUNT) {
      return <AddAccount {...this.props} />
    }

    return <SelectAccount {...this.props} />
  }

  render () {
    const { t, accounts } = this.props
    const displaySelectAccount = hasItems(accounts)

    if (displaySelectAccount) {
      return (
        <Fragment>
          <CardContent>
            <strong>{t('bankAccountLabel')}</strong>
            <p>{t('addOrSelectAccount')}</p>
            <SegmentedSwitch
              options={[
                {
                  title: t('selectAccountOption'),
                  value: SELECT_ACCOUNT,
                },
                {
                  title: t('addAccountOption'),
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
          <strong>{t('bankAccountLabel')}</strong>
          <p>{t('addNewAccount')}</p>
        </CardContent>
        <AddAccount {...this.props} />
      </Fragment>
    )
  }
}

BankAccountStep.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onContinue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

BankAccountStep.defaultProps = {
  accounts: [],
}
