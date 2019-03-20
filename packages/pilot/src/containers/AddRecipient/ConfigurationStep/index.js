import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardActions,
  CardContent,
  Grid,
  Row,
  Spacing,
} from 'former-kit'

import Anticipation from './Anticipation'
import Transfer from './Transfer'

import createNumberValidation from '../../../validation/number'
import createRequiredValidation from '../../../validation/required'
import createBetweenValidation from '../../../validation/between'
import createLessThanValidation from '../../../validation/lessThan'

import HelpModal from '../../RecipientDetails/Config/HelpModal'
import { virtualPageView } from '../../../vendor/googleTagManager'

import style from './style.css'

class ConfigurationsStep extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {
        anticipationDays: '15',
        anticipationModel: 'manual',
        anticipationVolumePercentage: '100',
        openedModal: false,
        transferDay: '1',
        transferEnabled: false,
        transferInterval: 'daily',
        ...props.data,
      },
      openedModal: false,
    }

    this.onFormChange = this.onFormChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.transferHandler = this.transferHandler.bind(this)
    this.handleOpenHelpModal = this.handleOpenHelpModal.bind(this)
    this.handleCloseHelpModal = this.handleCloseHelpModal.bind(this)
  }

  componentDidMount () {
    virtualPageView({
      path: '/virtual/recipient/add/configuration',
      title: 'Add Recipient - Configuration',
    })
  }

  onFormSubmit (formData, formErrors) {
    if (!formErrors) {
      this.props.onContinue(formData)
    }
  }

  onFormChange (formData) {
    this.setState({ formData })
  }

  transferHandler () {
    const { formData } = this.state

    this.setState({
      formData: {
        ...formData,
        transferEnabled: !formData.transferEnabled,
      },
    })
  }

  handleOpenHelpModal () {
    this.setState({ openedModal: true })
  }

  handleCloseHelpModal () {
    this.setState({ openedModal: false })
  }

  render () {
    const {
      canConfigureAnticipation,
      errors,
      maximumAnticipationDays,
      minimumAnticipationDelay,
      onBack,
      onCancel,
      t,
    } = this.props

    const { openedModal } = this.state

    const { formData: data } = this.state
    const { transferHandler } = this

    const numberMessage = t('pages.add_recipient.field_number')
    const isNumber = createNumberValidation(numberMessage)

    const requiredMessage = t('pages.add_recipient.field_required')
    const required = createRequiredValidation(requiredMessage)

    const start = 1
    const end = 100
    const betweenMessage =
      t('pages.add_recipient.field_between', { end, start })
    const between1and100 =
      createBetweenValidation(start, end, betweenMessage)

    const atLeastMessage =
      t('pages.add_recipient.field_minimum', { number: minimumAnticipationDelay })
    const atLeastMinimumDays =
      createLessThanValidation(minimumAnticipationDelay, atLeastMessage)

    return (
      <Fragment>
        <Form
          data={data}
          errors={errors}
          onChange={this.onFormChange}
          onSubmit={this.onFormSubmit}
          validateOn="blur"
          validation={{
            anticipationDays: [required, isNumber, atLeastMinimumDays],
            anticipationModel: [required],
            anticipationVolumePercentage: [required, isNumber, between1and100],
            transferDay: [required, isNumber],
            transferEnabled: [required],
            transferInterval: [required],
          }}
        >
          <CardContent>
            <Row>
              <h2 className={style.title}>
                {t('pages.add_recipient.anticipation_configuration')}
              </h2>
            </Row>
            <Row>
              <div className={style.alignItems}>
                <h3 className={style.subtitle}>
                  {t('pages.add_recipient.choose_anticipation_model')}
                </h3>
                <Spacing size="medium" />
                <Button
                  type="button"
                  size="tiny"
                  fill="outline"
                  onClick={this.handleOpenHelpModal}
                >
                  {t('pages.recipient_detail.help')}
                </Button>
              </div>
            </Row>
            <Grid>
              <Row>
                {
                  Anticipation({
                    canConfigureAnticipation,
                    data,
                    maximumAnticipationDays,
                    t,
                  })
                }
              </Row>
              <h2 className={style.transferTitle}>
                {t('pages.add_recipient.transfer_configuration')}
              </h2>
              { Transfer({ data, t, transferHandler }) }
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
        <HelpModal
          isOpen={openedModal}
          onExit={this.handleCloseHelpModal}
          title={t('pages.recipient_detail.title_modal')}
          t={t}
        />
      </Fragment>
    )
  }
}

ConfigurationsStep.propTypes = {
  canConfigureAnticipation: PropTypes.bool,
  data: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    transferDay: PropTypes.string,
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
  }),
  errors: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    transferDay: PropTypes.string,
    transferEnabled: PropTypes.string,
    transferInterval: PropTypes.string,
  }),
  maximumAnticipationDays: PropTypes.number,
  minimumAnticipationDelay: PropTypes.number,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ConfigurationsStep.defaultProps = {
  canConfigureAnticipation: true,
  data: {},
  errors: {},
  maximumAnticipationDays: 31,
  minimumAnticipationDelay: 15,
}

export default ConfigurationsStep
