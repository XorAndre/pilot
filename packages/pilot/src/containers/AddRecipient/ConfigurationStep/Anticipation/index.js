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

const anticipationModelOptions = ({
  canConfigureAnticipation,
  maximumAnticipationDays,
  t,
}) => {
  const manualByVolume = {
    name: t('pages.add_recipient.manual_volume'),
    value: 'manual',
  }

  const automaticByVolume = {
    name: t('pages.add_recipient.automatic_volume'),
    value: 'automatic_volume',
  }

  const automaticAtDays10And25 = {
    name: t('pages.add_recipient.automatic_1025'),
    value: 'automatic_1025',
  }

  const automaticDX = {
    name: t('pages.add_recipient.automatic_dx'),
    value: 'automatic_dx',
  }

  const availableOptions = [
    manualByVolume,
    automaticByVolume,
  ]

  if (canConfigureAnticipation) {
    availableOptions.push(automaticAtDays10And25)
  }

  if (canConfigureAnticipation && maximumAnticipationDays >= 31) {
    availableOptions.push(automaticDX)
  }

  return availableOptions
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
          className={style.marginBottom}
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
          className={style.marginBottom}
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

const Anticipation = ({
  canConfigureAnticipation,
  data,
  maximumAnticipationDays,
  t,
}) => (
  <Fragment>
    <Col tv={12} desk={12} tablet={12} palm={12}>
      <span className={style.label}>
        {t('pages.add_recipient.anticipation_model')}
      </span>
      <RadioGroup
        name="anticipationModel"
        options={anticipationModelOptions({
          canConfigureAnticipation,
          maximumAnticipationDays,
          t,
        })}
      />
    </Col>
    {renderAnticipationInput(data, t)}
  </Fragment>
)

Anticipation.propTypes = {
  canConfigureAnticipation: PropTypes.bool,
  data: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
  }),
  maximumAnticipationDays: PropTypes.number,
  t: PropTypes.func.isRequired,
}

Anticipation.defaultProps = {
  canConfigureAnticipation: true,
  data: {},
  maximumAnticipationDays: 31,
}

export default Anticipation
