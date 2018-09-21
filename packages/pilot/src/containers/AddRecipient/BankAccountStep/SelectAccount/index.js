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

    return {
      name: `${account.name} - ${bankName} - ${account.agency} - ${account.number}`,
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
          t,
          options,
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

SelectAccount.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      type: PropTypes.oneOf(accountTypes),
      agency: PropTypes.string,
      bank: PropTypes.string,
      id: PropTypes.string,
    })
  ),
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
