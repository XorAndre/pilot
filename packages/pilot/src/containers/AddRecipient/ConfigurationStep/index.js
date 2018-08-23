import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardActions,
  CardContent,
  Col,
  Grid,
  Row,
  Spacing,
} from 'former-kit'

import style from './style.css'
import createRequiredValidation from '../../../validation/required'
import createNumberValidation from '../../../validation/number'
import Anticipation from './Anticipation'
import Transfer from './Transfer'

const number = t => createNumberValidation(t('pages.add_recipient.field_number'))
const required = t => createRequiredValidation(t('pages.add_recipient.field_required'))

class ConfigurationsStep extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {
        anticipationDays: '15',
        anticipationModel: 'manual',
        anticipationVolumePercentage: '100',
        transferDay: '10',
        transferEnabled: false,
        transferInterval: 'daily',
        transferWeekday: 'monday',
        ...props.data,
      },
    }

    this.onFormChange = this.onFormChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.transferHandler = this.transferHandler.bind(this)
  }

  onFormSubmit (formData, formErrors) {
    if (!formErrors) {
      this.props.onContinue(formData)
    }
  }

  onFormChange (formData) {
    this.setState({
      formData,
    })
  }

  transferHandler () {
    const {
      formData,
    } = this.state

    this.setState({
      formData: {
        ...formData,
        transferEnabled: !formData.transferEnabled,
      },
    })
  }

  render () {
    const {
      errors,
      onBack,
      onCancel,
      t,
    } = this.props
    const {
      formData,
    } = this.state

    return (
      <Form
        data={formData}
        errors={errors}
        onChange={this.onFormChange}
        onSubmit={this.onFormSubmit}
        validateOn="blur"
        validation={{
          anticipationDays: [required(t), number(t)],
          anticipationModel: [required(t)],
          anticipationVolumePercentage: [required(t), number(t)],
          transferDay: [required(t), number(t)],
          transferEnabled: [required(t)],
          transferInterval: [required(t)],
          transferWeekday: [required(t)],
        }}
      >
        <CardContent>
          <Grid>
            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <h2 className={style.title}>
                  {t('pages.add_recipient.anticipation_configuration')}
                </h2>
                <h3 className={style.subtitle}>
                  {t('pages.add_recipient.choose_anticipation_model')}
                </h3>
              </Col>
              {Anticipation({ data: formData, t })}
            </Row>
            <h2 className={style.title}>
              {t('pages.add_recipient.transfer_configuration')}
            </h2>
            {Transfer({
              data: formData,
              t,
              transferHandler: this.transferHandler,
            })}
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            fill="outline"
            onClick={onCancel}
            relevance="low"
          >
            {t('pages.add_recipient.cancel')}
          </Button>
          <Spacing />
          <Button
            fill="outline"
            onClick={onBack}
          >
            {t('pages.add_recipient.back')}
          </Button>
          <Button
            fill="gradient"
            type="submit"
          >
            {t('pages.add_recipient.continue')}
          </Button>
        </CardActions>
      </Form>
    )
  }
}

ConfigurationsStep.propTypes = {
  data: PropTypes.shape({
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    anticipationDays: PropTypes.string,
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
    transferDay: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
  errors: PropTypes.shape({
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    anticipationDays: PropTypes.string,
    transferEnabled: PropTypes.string,
    transferInterval: PropTypes.string,
    transferDay: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ConfigurationsStep.defaultProps = {
  data: {},
  errors: {},
}

export default ConfigurationsStep
