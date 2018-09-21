import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
  CardActions,
  SegmentedSwitch,
  Spacing,
} from 'former-kit'
import {
  complement,
  either,
  isEmpty,
  isNil,
} from 'ramda'
import AddAccountContent from '../../../AddRecipient/BankAccountStep/AddAccount/AddAccountContent'
import SelectAccountContent from '../../../AddRecipient/BankAccountStep/SelectAccount/SelectAccountContent'
import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import accountTypes from '../../../../models/accountTypes'
import styles from '../style.css'
import { BANK_ACCOUNT } from '../contentIds'


const hasItems = complement(either(isEmpty, isNil))

const toDropdownOptions = account => ({
  name: `${account.name} - ${account.bank} - ${account.agency} - ${account.number}`,
  value: account.id,
})

const ADD_ACCOUNT = 'addAccount'
const SELECT_ACCOUNT = 'selectAccount'

class BankAccountContent extends Component {
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
    const {
      accounts,
      data,
      t,
    } = this.props

    if (selectedForm === ADD_ACCOUNT) {
      return (
        <div className={styles.paddingTop}>
          {AddAccountContent({
            data: data.addAccount,
            t,
          })}
        </div>
      )
    }

    return (
      <div className={styles.paddingTop}>
        {SelectAccountContent({
          accounts,
          options: accounts.map(toDropdownOptions),
          data: data.selectAccount,
          t,
        })}
      </div>
    )
  }

  render () {
    const {
      accounts,
      onCancel,
      onChange,
      onSave,
      t,
    } = this.props

    const displaySelectAccount = hasItems(accounts)

    const required = createRequiredValidation(t('requiredMessage'))
    const number = createNumberValidation(t('numberMessage'))

    if (displaySelectAccount) {
      return (
        <Fragment>
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
          <Form
            data={{
              type: accountTypes[0],
              name: '',
              number: '',
              bank: '',
              agency: '',
              id: accounts[0].id,
            }}
            validateOn="blur"
            validation={{
              name: [required],
              number: [required, number],
              type: [required],
              agency: [required, number],
              bank: [required],
            }}
            onSubmit={(data, errors) => {
              if (!errors) onSave(data)
            }}
            onChange={onChange}
          >
            { this.renderSelectedForm() }
            <div className={styles.paddingTop}>
              <CardActions>
                <Button
                  type="button"
                  onClick={() => onCancel(BANK_ACCOUNT)}
                  fill="outline"
                >
                  {t('pages.recipient_detail.cancel')}
                </Button>
                <Spacing size="medium" />
                <Button
                  type="submit"
                  fill="gradient"
                >
                  {t('pages.recipient_detail.save')}
                </Button>
              </CardActions>
            </div>
          </Form>
        </Fragment>
      )
    }
    return null
  }
}

BankAccountContent.propTypes = {
  data: PropTypes.shape({
    [BANK_ACCOUNT]: PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      type: PropTypes.string,
      agency: PropTypes.string,
      bank: PropTypes.string,
      id: PropTypes.string,
    }),
  }),
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

BankAccountContent.defaultProps = {
  accounts: [],
  data: {},
}

export default BankAccountContent
