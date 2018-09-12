import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'

const EditButton = props => (
  <Button
    type="button"
    size="tiny"
    fill="outline"
    {...props}
  >
    {props.t('pages.add_recipient.edit')}
  </Button>
)

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default EditButton
