import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  FormDropdown,
  Row,
} from 'former-kit'

const SelectAccount = ({
  options,
  t,
}) => (
  <Row>
    <Col tv={2} desk={4} tablet={5} palm={8}>
      <FormDropdown
        label={t('pages.add_recipient.select_bank_account')}
        name="id"
        options={options}
      />
    </Col>
  </Row>
)

SelectAccount.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  t: PropTypes.func.isRequired,
}

SelectAccount.defaultProps = {
  options: [],
}

export default SelectAccount
