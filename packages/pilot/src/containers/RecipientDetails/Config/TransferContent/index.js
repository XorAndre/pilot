import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
  CardActions,
  Col,
  Grid,
  Row,
  Spacing,
} from 'former-kit'
import Transfer from '../../../../../src/containers/AddRecipient/ConfigurationStep/Transfer'
import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import styles from '../style.css'
import { TRANSFER } from '../contentIds'

const TransferContent = ({
  data,
  onCancel,
  onSave,
  onChange,
  onToggle,
  t,
}) => {
  const required = createRequiredValidation(t('requiredMessage'))
  const number = createNumberValidation(t('numberMessage'))
  return (
    <Form
      data={data}
      validation={{
        transferDay: [required, number],
        transferEnabled: [required],
        transferInterval: [required],
        transferWeekday: [required],
      }}
      onChange={onChange}
      onSubmit={onSave}
    >
      <Grid>
        <Row>
          <Col>
            {Transfer({
              data,
              t,
              transferHandler: onToggle,
            })}
          </Col>
        </Row>
      </Grid>
      <div className={styles.paddingTop}>
        <CardActions>
          <Button
            fill="outline"
            onClick={() => onCancel(TRANSFER)}
            type="button"
          >
            {t('pages.recipient_detail.cancel')}
          </Button>
          <Spacing size="medium" />
          <Button
            fill="gradient"
            type="submit"
          >
            {t('pages.recipient_detail.save')}
          </Button>
        </CardActions>
      </div>
    </Form>
  )
}

TransferContent.propTypes = {
  data: PropTypes.shape({
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
    transferDay: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

TransferContent.defaultProps = {
  data: {},
}

export default TransferContent

