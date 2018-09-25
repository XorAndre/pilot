import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  FormDropdown,
  FormInput,
  Grid,
  Row,
} from 'former-kit'

import accountTypes from '../../../../models/accountTypes'
import bankCodes from '../../../../models/banks'

const AddAccountContent = ({ t }) => {
  const accountTypeOptions = accountTypes.map(accountType => ({
    name: t(`models.account_type.${accountType}`),
    value: accountType,
  }))

  const bankOptions = bankCodes.map(bankCode => ({
    name: t(`models.bank_code.${bankCode}`),
    value: bankCode,
  }))

  return (
    <Fragment>
      <Grid>
        <Row>
          <Col tv={5} desk={7} tablet={9} palm={8}>
            <FormDropdown
              name="bank"
              label={t('pages.add_recipient.bank')}
              options={bankOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col tv={2} desk={3} tablet={4} palm={8}>
            <FormInput
              type="text"
              label={t('pages.add_recipient.agency_no_digit')}
              name="agency"
              placeholder={t('pages.add_recipient.type_agency_number')}
            />
          </Col>
          <Col tv={3} desk={4} tablet={5} palm={8}>
            <FormInput
              type="text"
              label={t('pages.add_recipient.account_with_digit')}
              name="number"
              placeholder={t('pages.add_recipient.type_account_with_digit')}
            />
          </Col>
        </Row>
        <Row>
          <Col tv={2} desk={3} tablet={4} palm={8}>
            <FormDropdown
              name="type"
              label={t('pages.add_recipient.account_type')}
              options={accountTypeOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col tv={5} desk={7} tablet={9} palm={8}>
            <FormInput
              type="text"
              label={t('pages.add_recipient.account_name')}
              name="name"
              placeholder={t('pages.add_recipient.type_account_name')}
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}

AddAccountContent.propTypes = {
  t: PropTypes.func.isRequired,
}

export default AddAccountContent
