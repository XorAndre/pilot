import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  FormDropdown,
  FormInput,
  Row,
} from 'former-kit'

import SearchableDropdown from '../../../../components/SearchableDropdown/'
import accountTypes from '../../../../models/accountTypes'
import bankCodes from '../../../../models/banks'

import style from './style.css'

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
      <Row>
        <Col tv={2} desk={4} tablet={5} palm={8}>
          <SearchableDropdown
            name="bank"
            placeholder={t('pages.add_recipient.type_bank_name')}
            label={t('pages.add_recipient.bank')}
            noOptionsMessage={t('pages.add_recipient.no_results')}
            options={bankOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col tv={2} desk={3} tablet={4} palm={8}>
          <FormInput
            className={style.marginBottom}
            type="text"
            label={t('pages.add_recipient.agency')}
            name="agency"
            placeholder={t('pages.add_recipient.type_agency_number')}
          />
        </Col>
        <Col tv={1} desk={1} tablet={1} palm={8}>
          <FormInput
            className={style.marginBottom}
            type="text"
            label={t('pages.add_recipient.agency_digit')}
            name="agency_digit"
            placeholder={t('pages.add_recipient.type_agency_digit')}
          />
        </Col>
      </Row>
      <Row>
        <Col tv={2} desk={3} tablet={4} palm={8}>
          <FormInput
            className={style.marginBottom}
            type="text"
            label={t('pages.add_recipient.account')}
            name="number"
            placeholder={t('pages.add_recipient.type_account')}
          />
        </Col>
        <Col tv={1} desk={1} tablet={1} palm={8}>
          <FormInput
            className={style.marginBottom}
            type="text"
            label={t('pages.add_recipient.account_digit')}
            name="number_digit"
            placeholder={t('pages.add_recipient.type_account_digit')}
          />
        </Col>
      </Row>
      <Row>
        <Col tv={2} desk={4} tablet={5} palm={8}>
          <div className={style.marginBottom}>
            <FormDropdown
              name="type"
              label={t('pages.add_recipient.account_type')}
              options={accountTypeOptions}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col tv={2} desk={4} tablet={5} palm={8}>
          <FormInput
            className={style.marginBottom}
            type="text"
            label={t('pages.add_recipient.account_name')}
            name="name"
            placeholder={t('pages.add_recipient.type_account_name')}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

AddAccountContent.propTypes = {
  t: PropTypes.func.isRequired,
}

export default AddAccountContent
