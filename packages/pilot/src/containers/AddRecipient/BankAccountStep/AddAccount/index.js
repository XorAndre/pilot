import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardActions,
  CardContent,
  Spacing,
} from 'former-kit'

import accountTypes from '../../../../models/accountTypes'
import AddAccountContent from './AddAccountContent'

import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import createMaxLengthValidation from '../../../../validation/maxLength'

import style from '../style.css'

const AddAccount = ({
  data,
  errors,
  onBack,
  onCancel,
  onContinue,
  t,
}) => {
  const max13Message = t('pages.add_recipient.field_max', { number: 13 })
  const max30Message = t('pages.add_recipient.field_max', { number: 30 })
  const max5Message = t('pages.add_recipient.field_max', { number: 5 })
  const numberMessage = t('pages.add_recipient.field_number')
  const requiredMessage = t('pages.add_recipient.field_required')

  const isNumber = createNumberValidation(numberMessage)
  const max13Characters = createMaxLengthValidation(13, max13Message)
  const max30Characters = createMaxLengthValidation(30, max30Message)
  const max5Characters = createMaxLengthValidation(5, max5Message)
  const required = createRequiredValidation(requiredMessage)

  return (
    <Form
      data={data}
      validateOn="blur"
      validation={{
        agency: [required, isNumber, max5Characters],
        bank: [required],
        name: [required, max30Characters],
        number: [required, isNumber, max13Characters],
        type: [required],
      }}
      onSubmit={(formData, formErrors) => {
        if (!formErrors) onContinue(formData)
      }}
      errors={errors}
    >
      <CardContent>
        {AddAccountContent({ t })}
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
          <Spacing size="medium" />
          <Button
            type="submit"
            fill="gradient"
          >
            {t('pages.add_recipient.continue')}
          </Button>
        </CardActions>
      </div>
    </Form>
  )
}

export const accountProps = PropTypes.shape({
  name: PropTypes.string,
  number: PropTypes.string,
  type: PropTypes.oneOf(accountTypes),
  agency: PropTypes.string,
  bank: PropTypes.string,
})

export const accountErrorProps = PropTypes.shape({
  name: PropTypes.string,
  number: PropTypes.string,
  type: PropTypes.string,
  agency: PropTypes.string,
  bank: PropTypes.string,
})

export const accountDefaultProps = {
  name: '',
  number: '',
  type: 'conta_corrente',
  agency: '',
  bank: '001',
}

AddAccount.propTypes = {
  data: accountProps,
  errors: accountErrorProps,
  onContinue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

AddAccount.defaultProps = {
  data: accountDefaultProps,
  errors: {},
}

export default AddAccount
