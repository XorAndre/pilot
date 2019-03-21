import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  SegmentedSwitch,
  CardContent,
  Row,
} from 'former-kit'

import {
  complement,
  either,
  isEmpty,
  isNil,
} from 'ramda'

import AddAccount, {
  accountProps,
  accountDefaultProps,
  accountErrorProps,
} from './AddAccount'

import SelectAccount, { userAccountProps } from './SelectAccount'
import { virtualPageView } from '../../../vendor/googleTagManager'
import style from './style.css'

const hasItems = complement(either(isEmpty, isNil))

const isNewAccount = account => (
  !account.id &&
  account.number !== ''
)

const ADD_ACCOUNT = 'addAccount'
const SELECT_ACCOUNT = 'selectAccount'

class BankAccountStep extends Component {
  constructor (props) {
    super(props)
    const {
      data,
    } = props
    let selectedForm = SELECT_ACCOUNT

    if (isNewAccount(data)) {
      selectedForm = ADD_ACCOUNT
    }

    this.state = { selectedForm }
    this.handleFormSelectionChange = this.handleFormSelectionChange.bind(this)
  }

  componentDidMount () {
    virtualPageView({
      path: '/virtual/recipient/add/bank_account',
      title: 'Add Recipient - Bank Account',
    })
  }

  handleFormSelectionChange (selectedForm) {
    this.setState({ selectedForm })
  }

  renderSelectedForm () {
    const { selectedForm } = this.state
    const { data, sharedData } = this.props

    if (selectedForm === ADD_ACCOUNT) {
      let addAccountData
      if (isNewAccount(data)) addAccountData = data
      return (
        <AddAccount
          {...this.props}
          data={addAccountData}
        />
      )
    }
    return (
      <SelectAccount
        {...this.props}
        sharedData={sharedData}
      />
    )
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
            <Row>
              <h2 className={style.title}>{t('pages.add_recipient.bank_account')}</h2>
            </Row>
            <Row>
              <h3 className={style.subtitle}>{t('pages.add_recipient.select_or_add_account')}</h3>
            </Row>
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
          <h2 className={style.title}>{t('pages.add_recipient.bank_account')}</h2>
          <h3 className={style.subtitle}>{t('pages.add_recipient.add_new_account')}</h3>
        </CardContent>
        <AddAccount {...this.props} />
      </Fragment>
    )
  }
}

BankAccountStep.propTypes = {
  accounts: PropTypes.arrayOf(userAccountProps),
  data: userAccountProps,
  errors: accountErrorProps,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  sharedData: PropTypes.shape({
    cnpj: PropTypes.string,
    cpf: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
}

BankAccountStep.defaultProps = {
  accounts: [],
  data: accountDefaultProps,
  errors: {},
  sharedData: {},
}

const userAccountDefaultProps = {
  ...accountDefaultProps,
  id: '',
}

export {
  accountProps,
  accountDefaultProps,
  accountErrorProps,
  userAccountProps,
  userAccountDefaultProps,
}

export default BankAccountStep
