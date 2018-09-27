import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  FormInput,
  RadioGroup,
} from 'former-kit'

import {
  either,
  equals,
} from 'ramda'

import style from '../style.css'

const anticipationModelOptions = (t, canConfigureAnticipation) => {
  if (canConfigureAnticipation) {
    return [
      {
        name: t('pages.add_recipient.manual_volume'),
        value: 'manual',
      },
      {
        name: t('pages.add_recipient.automatic_volume'),
        value: 'automatic_volume',
      },
      {
        name: t('pages.add_recipient.automatic_1025'),
        value: 'automatic_1025',
      },
      {
        name: t('pages.add_recipient.automatic_dx'),
        value: 'automatic_dx',
      },
    ]
  }

  return [
    {
      name: t('pages.add_recipient.manual_volume'),
      value: 'manual',
    },
    {
      name: t('pages.add_recipient.automatic_volume'),
      value: 'automatic_volume',
    },
  ]
}

const renderAnticipationInput = (data, t) => {
  const { anticipationModel } = data
  const volumePercentage = either(
    equals('automatic_volume'),
    equals('manual')
  )

  if (volumePercentage(anticipationModel)) {
    return (
      <Col tv={3} desk={3} tablet={5} palm={5}>
        <FormInput
          label={t('pages.add_recipient.anticipation_volume_percentage')}
          name="anticipationVolumePercentage"
          type="number"
        />
        <div className={style.heightMedium} />
      </Col>
    )
  }

  if (anticipationModel === 'automatic_dx') {
    return (
      <Col tv={3} desk={3} tablet={5} palm={5}>
        <FormInput
          label={t('pages.add_recipient.anticipation_days')}
          name="anticipationDays"
          type="number"
        />
        <div className={style.heightMedium} />
      </Col>
    )
  }

  return null
}

const Anticipation = ({ data, t, canConfigureAnticipation }) => (
  <Fragment>
    <Col tv={12} desk={12} tablet={12} palm={12}>
      <span className={style.label}>
        {t('pages.add_recipient.anticipation_model')}
      </span>
      <RadioGroup
        name="anticipationModel"
        options={anticipationModelOptions(t, canConfigureAnticipation)}
      />
    </Col>
    {renderAnticipationInput(data, t)}
  </Fragment>
)

Anticipation.propTypes = {
  canConfigureAnticipation: PropTypes.bool,
  data: PropTypes.shape({
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    anticipationDays: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
}

Anticipation.defaultProps = {
  canConfigureAnticipation: true,
  data: {},
}

export default Anticipation
