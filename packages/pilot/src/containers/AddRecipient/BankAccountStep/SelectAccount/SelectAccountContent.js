import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  FormDropdown,
  Grid,
  Row,
} from 'former-kit'

const SelectAccount = ({
  options,
  t,
}) => (
  <Grid>
    <Row>
      <Col>
        <FormDropdown
          label={t('pages.add_recipient.select_bank_account')}
          name="id"
          options={options}
        />
      </Col>
    </Row>
  </Grid>
)

SelectAccount.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  t: PropTypes.func.isRequired,
}

SelectAccount.defaultProps = {
  options: [],
}

export default SelectAccount
