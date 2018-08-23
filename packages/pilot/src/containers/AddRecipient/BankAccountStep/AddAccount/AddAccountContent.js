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

const AddAccountContent = ({
  t,
}) => {
  const accountTypeOptions = accountTypes.map(accountType => ({
    name: t(`models.account_type.${accountType}`),
    value: accountType,
  }))
  return (
    <Fragment>
      <Grid>
        <Row>
          <Col tv={2} desk={2} tablet={4} palm={4}>
            <FormInput
              type="text"
              label={t('pages.add_recipient.bank')}
              name="bank"
              placeholder={t('pages.add_recipient.type_bank_name')}
              value=""
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
    </Fragment>
  )
}

AddAccountContent.propTypes = {
  t: PropTypes.func.isRequired,
}

export default AddAccountContent
