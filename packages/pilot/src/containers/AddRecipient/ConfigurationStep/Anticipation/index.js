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

const anticipationModelOptions = t => (
  [
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
)

const renderAnticipationInput = (data, t) => {
  const { anticipationModel } = data
  const volumePercentage = either(
    equals('automatic_volume'),
    equals('manual')
  )

  if (volumePercentage(anticipationModel)) {
    return (
      <Col tv={2} desk={2} tablet={4} palm={4}>
        <FormInput
          label={t('pages.add_recipient.anticipation_volume_percentage')}
          max="100"
          min="1"
          name="anticipationVolumePercentage"
          type="number"
        />
        <div className={style.heightMedium} />
      </Col>
    )
  }

  if (anticipationModel === 'automatic_dx') {
    return (
      <Col tv={2} desk={2} tablet={4} palm={4}>
        <FormInput
          label={t('pages.add_recipient.anticipation_days')}
          min="1"
          name="anticipationDays"
          type="number"
        />
        <div className={style.heightMedium} />
      </Col>
    )
  }

  return null
}


const Anticipation = ({ data, t }) => (
  <Fragment>
    <Col tv={12} desk={12} tablet={12} palm={12}>
      <span className={style.label}>
        {t('pages.add_recipient.anticipation_model')}
      </span>
      <RadioGroup
        name="anticipationModel"
        options={anticipationModelOptions(t)}
      />
    </Col>
    {renderAnticipationInput(data, t)}
  </Fragment>
)

Anticipation.propTypes = {
  data: PropTypes.shape({
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    anticipationDays: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
}

Anticipation.defaultProps = {
  data: {},
}

export default Anticipation

