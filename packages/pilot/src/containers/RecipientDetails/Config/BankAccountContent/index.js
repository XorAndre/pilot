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
import createMaxLengthValidation from '../../../../validation/maxLength'
import accountTypes from '../../../../models/accountTypes'
import styles from '../style.css'

import {
  BANK_ACCOUNT,
  ADD_ACCOUNT,
  SELECT_ACCOUNT,
} from '../contentIds'

const hasItems = complement(either(isEmpty, isNil))

const toDropdownOptions = (account) => {
  const {
    agency,
    agency_digit: agencyDigit,
    bank,
    id,
    name,
    number,
    number_digit: numberDigit,
  } = account

  const accountNumber = `${number}-${numberDigit}`

  const agencyNumber = (agencyDigit)
    ? `${agency}-${agencyDigit}`
    : agency

  return {
    name: `${name} - ${bank} - ${agencyNumber} - ${accountNumber}`,
    value: id,
  }
}

class BankAccountContent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedForm: SELECT_ACCOUNT,
    }

    this.handleFormSelectionChange = this.handleFormSelectionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (data, errors) {
    if (!errors) {
      const { selectedForm } = this.state
      let dataTransformed
      if (selectedForm === ADD_ACCOUNT) {
        dataTransformed = {
          ...data,
          id: undefined,
        }
      } else {
        dataTransformed = {
          id: data.id,
        }
      }
      this.props.onSave(dataTransformed)
    }
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
          data: data.selectAccount,
          options: accounts.map(toDropdownOptions),
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
      t,
    } = this.props

    const displaySelectAccount = hasItems(accounts)

    const max30Message = t('pages.add_recipient.field_max', { number: 30 })
    const max13Message = t('pages.add_recipient.field_max', { number: 13 })
    const max5Message = t('pages.add_recipient.field_max', { number: 5 })
    const max2Message = t('pages.add_recipient.field_max', { number: 2 })
    const max1Message = t('pages.add_recipient.field_max', { number: 1 })

    const required = createRequiredValidation(t('pages.recipient_detail.required'))
    const number = createNumberValidation(t('pages.recipient_detail.number'))
    const max30Characters = createMaxLengthValidation(30, max30Message)
    const max13Characters = createMaxLengthValidation(13, max13Message)
    const max5Characters = createMaxLengthValidation(5, max5Message)
    const max2Characters = createMaxLengthValidation(2, max2Message)
    const max1Characters = createMaxLengthValidation(1, max1Message)

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
              agency: '',
              bank: '',
              id: accounts[0].id,
              name: '',
              number: '',
              type: accountTypes[0],
            }}
            validateOn="blur"
            validation={{
              agency: [required, number, max5Characters],
              agency_digit: [number, max1Characters],
              bank: [required],
              name: [required, max30Characters],
              number: [required, number, max13Characters],
              number_digit: [required, number, max2Characters],
              type: [required],
            }}
            onSubmit={this.handleSubmit}
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
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  data: PropTypes.shape({
    [BANK_ACCOUNT]: PropTypes.shape({
      agency: PropTypes.string,
      bank: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
      type: PropTypes.string,
    }),
  }),
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

BankAccountContent.defaultProps = {
  accounts: [],
  data: {},
}

export default BankAccountContent
