import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardActions,
  CardContent,
  Col,
  FormInput,
  Spacing,
  Row,
} from 'former-kit'

import accountTypes from '../../../../models/accountTypes'
import AddAccountContent from './AddAccountContent'

import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import createMaxLengthValidation from '../../../../validation/maxLength'
import createAccountDigitValidation from '../../../../validation/accountCheckDigit'
import createAgencyDigitValidation from '../../../../validation/agencyCheckDigit'

import style from '../style.css'

const renderDocumentNumber = (data, t) => {
  if (data.identification.documentType === 'cpf') {
    return (
      <Row>
        <Col tv={2} desk={4} tablet={5} palm={8}>
          <FormInput
            disabled
            className={style.marginBottom}
            label={t('pages.add_recipient.document_owner')}
            type="text"
            value={data.identification.cpf}
          />
        </Col>
      </Row>
    )
  }

  return (
    <Row>
      <Col tv={2} desk={4} tablet={5} palm={8}>
        <FormInput
          disabled
          className={style.marginBottom}
          label={t('pages.add_recipient.document_owner')}
          type="text"
          value={data.identification.cnpj}
        />
      </Col>
    </Row>
  )
}

const AddAccount = ({
  data,
  errors,
  onBack,
  onCancel,
  onContinue,
  sharedData,
  t,
}) => {
  const max30Message = t('pages.add_recipient.field_max', { number: 30 })
  const max13Message = t('pages.add_recipient.field_max', { number: 13 })
  const max5Message = t('pages.add_recipient.field_max', { number: 5 })
  const numberMessage = t('pages.add_recipient.field_number')
  const requiredMessage = t('pages.add_recipient.field_required')
  const digitMessage = t('pages.add_recipient.field_invalid_digit')

  const isNumber = createNumberValidation(numberMessage)
  const max30Characters = createMaxLengthValidation(30, max30Message)
  const max13Characters = createMaxLengthValidation(13, max13Message)
  const max5Characters = createMaxLengthValidation(5, max5Message)
  const required = createRequiredValidation(requiredMessage)
  const isAccountDigit = createAccountDigitValidation(digitMessage)
  const isAgencyDigit = createAgencyDigitValidation(digitMessage)

  return (
    <Form
      data={data}
      validateOn="blur"
      validation={{
        agency: [required, isNumber, max5Characters],
        agency_digit: [isAgencyDigit],
        bank: [required],
        name: [required, max30Characters],
        number: [required, isNumber, max13Characters],
        number_digit: [required, isAccountDigit],
        type: [required],
      }}
      onSubmit={(formData, formErrors) => {
        if (!formErrors) onContinue(formData)
      }}
      errors={errors}
    >
      <CardContent>
        {renderDocumentNumber(sharedData, t)}
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
  agency: PropTypes.string,
  agency_digit: PropTypes.string,
  bank: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  number_digit: PropTypes.string,
  type: PropTypes.oneOf(accountTypes),
})

export const accountErrorProps = PropTypes.shape({
  agency: PropTypes.string,
  agency_digit: PropTypes.string,
  bank: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  number_digit: PropTypes.string,
  type: PropTypes.string,
})

export const accountDefaultProps = {
  agency: '',
  agency_digit: '',
  bank: '001',
  name: '',
  number: '',
  number_digit: '',
  type: 'conta_corrente',
}

AddAccount.propTypes = {
  data: accountProps,
  errors: accountErrorProps,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  sharedData: PropTypes.shape({}),
  t: PropTypes.func.isRequired,
}

AddAccount.defaultProps = {
  data: accountDefaultProps,
  errors: {},
  sharedData: {},
}

export default AddAccount
