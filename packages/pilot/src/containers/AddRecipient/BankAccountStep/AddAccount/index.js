import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardActions,
  CardContent,
  Col,
  FormDropdown,
  FormInput,
  Grid,
  Row,
  Spacing,
} from 'former-kit'

import accountTypes from '../../../../models/accountTypes'
import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import style from '../style.css'

const AddAccount = ({
  data,
  errors,
  onBack,
  onCancel,
  onContinue,
  t,
}) => {
  const required = createRequiredValidation(t('pages.add_recipient.field_required'))
  const number = createNumberValidation(t('pages.add_recipient.field_number'))

  const accountTypeOptions = accountTypes.map(accountType => ({
    name: t(`models.account_type.${accountType}`),
    value: accountType,
  }))

  return (
    <Form
      data={data}
      validateOn="blur"
      validation={{
        account_name: [required],
        account_number: [required, number],
        account_type: [required],
        agency: [required, number],
        bank: [required],
      }}
      onSubmit={(formData, formErrors) => {
        if (!formErrors) onContinue(formData)
      }}
      errors={errors}
    >
      <CardContent>
        <Grid>
          <Row>
            <Col tv={2} desk={2} tablet={4} palm={4}>
              <FormInput
                type="text"
                label={t('pages.add_recipient.bank')}
                name="bank"
                placeholder={t('pages.add_recipient.type_bank_name')}
              />
            </Col>
          </Row>
          <Row>
            <Col tv={3} desk={3} tablet={6} palm={6}>
              <FormInput
                type="text"
                label={t('pages.add_recipient.agency_no_digit')}
                name="agency"
                placeholder={t('pages.add_recipient.type_agency_number')}
              />
            </Col>
            <Col tv={3} desk={3} tablet={4} palm={4}>
              <FormInput
                type="text"
                label={t('pages.add_recipient.account_with_digit')}
                name="account_number"
                placeholder={t('pages.add_recipient.type_account_with_digit')}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormDropdown
                name="account_type"
                label={t('pages.add_recipient.account_type')}
                options={accountTypeOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col tv={3} desk={3} tablet={6} palm={6}>
              <FormInput
                type="text"
                label={t('pages.add_recipient.account_name')}
                name="account_name"
                placeholder={t('pages.add_recipient.type_account_name')}
              />
            </Col>
          </Row>
        </Grid>
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

AddAccount.propTypes = {
  data: PropTypes.shape({
    account_name: PropTypes.string,
    account_number: PropTypes.string,
    account_type: PropTypes.oneOf(accountTypes),
    agency: PropTypes.string,
    bank: PropTypes.string,
  }),
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

AddAccount.defaultProps = {
  data: {
    account_name: '',
    account_number: '',
    account_type: 'conta_corrente',
    agency: '',
    bank: '',
  },
  errors: {},
}

export default AddAccount
