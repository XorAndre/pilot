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
import Anticipation from '../../../../../src/containers/AddRecipient/ConfigurationStep/Anticipation'
import createNumberValidation from '../../../../validation/number'
import createRequiredValidation from '../../../../validation/required'
import styles from '../style.css'
import { ANTICIPATION } from '../contentIds'

const AnticipationContent = ({
  data,
  onCancel,
  onSave,
  onChange,
  t,
}) => {
  const required = createRequiredValidation(t('requiredMessage'))
  const number = createNumberValidation(t('numberMessage'))
  return (
    <Form
      data={data}
      validation={{
        anticipationDays: [required, number],
        anticipationModel: [required],
        anticipationVolumePercentage: [required, number],
      }}
      onChange={onChange}
      onSubmit={onSave}
    >
      <Grid>
        <Row>
          <Col>
            {Anticipation({
              data,
              t,
            })}
          </Col>
        </Row>
      </Grid>
      <div className={styles.paddingTop}>
        <CardActions>
          <Button
            fill="outline"
            onClick={() => onCancel(ANTICIPATION)}
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

AnticipationContent.propTypes = {
  data: PropTypes.shape({
    [ANTICIPATION]: PropTypes.shape({
      anticipationModel: PropTypes.string,
      anticipationVolumePercentage: PropTypes.string,
      anticipationDays: PropTypes.string,
    }),
  }),
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

AnticipationContent.defaultProps = {
  data: {},
}

export default AnticipationContent

