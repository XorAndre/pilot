import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import { replace } from 'ramda'

import {
  Button,
  CardActions,
  CardContent,
  Spacing,
} from 'former-kit'

import accountTypes from '../../../../models/accountTypes'
import SelectAccountContent from './SelectAccountContent'
import banks from '../../../../models/banks'
import style from '../style.css'

const removeBankCode = replace(/^\d+ - /, '')

const SelectAccount = ({
  accounts,
  data,
  onBack,
  onCancel,
  onContinue,
  t,
}) => {
  const options = accounts.map((account) => {
    const bankCode = account.bank
    const bankHasName = banks.includes(bankCode)
    let bankName

    if (bankHasName) {
      const bankNameWithCode = t(`models.bank_code.${bankCode}`)
      bankName = removeBankCode(bankNameWithCode)
    } else {
      bankName = bankCode
    }

    const agency = account.agency + account.agency_digit
    const number = `${account.number}-${account.number_digit}`

    return {
      name: `${account.name} - ${bankName} - ${agency} - ${number}`,
      value: account.id,
    }
  })

  const continueWithSelectedAccount = (formData) => {
    const sameId = account => account.id === formData.id
    const account = accounts.find(sameId)
    return onContinue(account)
  }

  return (
    <Form
      onSubmit={continueWithSelectedAccount}
      data={{
        id: data.id || options[0].value,
      }}
    >
      <CardContent>
        {SelectAccountContent({
          options,
          t,
        })}
      </CardContent>
      <div className={style.paddingTop}>
        <CardActions>
          <Button
            type="button"
            onClick={onCancel}
            relevance="low"
            fill="outline"
          >
            {t('pages.add_recipient.cancel')}
          </Button>
          <Spacing />
          <Button
            type="button"
            onClick={onBack}
            fill="outline"
          >
            {t('pages.add_recipient.back')}
          </Button>
          <Button
            fill="gradient"
            type="submit"
          >
            {t('pages.add_recipient.continue')}
          </Button>
        </CardActions>
      </div>
    </Form>
  )
}

export const userAccountProps = PropTypes.shape({
  agency: PropTypes.string,
  bank: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  type: PropTypes.oneOf(accountTypes),
})

SelectAccount.propTypes = {
  accounts: PropTypes.arrayOf(userAccountProps),
  data: PropTypes.shape({
    id: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

SelectAccount.defaultProps = {
  accounts: [],
  data: {},
}

export default SelectAccount
