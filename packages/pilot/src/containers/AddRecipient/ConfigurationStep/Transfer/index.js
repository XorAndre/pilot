import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import IconInfo from 'emblematic-icons/svg/Info24.svg'
import {
  Col,
  FormCheckbox,
  FormDropdown,
  Row,
  RadioGroup,
  Tooltip,
} from 'former-kit'
import { range } from 'ramda'
import style from '../style.css'

const transferIntervalOptions = t => (
  [
    {
      name: t('pages.add_recipient.daily'),
      value: 'daily',
    },
    {
      name: t('pages.add_recipient.weekly'),
      value: 'weekly',
    },
    {
      name: t('pages.add_recipient.monthly'),
      value: 'monthly',
    },
  ]
)

const transferWeekdayOptions = t => (
  [
    {
      name: t('pages.add_recipient.monday'),
      value: 'monday',
    },
    {
      name: t('pages.add_recipient.tuesday'),
      value: 'tuesday',
    },
    {
      name: t('pages.add_recipient.wednesday'),
      value: 'wednesday',
    },
    {
      name: t('pages.add_recipient.thursday'),
      value: 'thursday',
    },
    {
      name: t('pages.add_recipient.friday'),
      value: 'friday',
    },
  ]
)

const renderTransferInput = (data, t) => {
  const {
    transferDay,
    transferEnabled,
    transferInterval,
    transferWeekday,
  } = data

  const transferDayOptions = range(1, 32)
    .map(day => ({ name: day.toString(), value: day.toString() }))

  if (transferEnabled && transferInterval === 'monthly') {
    return (
      <Fragment>
        <span className={style.label}>
          {t('pages.add_recipient.transfer_day')}
          <div className={style.tooltip}>
            <Tooltip
              content={t('pages.add_recipient.transfer_tooltip')}
              placement="rightMiddle"
            >
              <IconInfo
                height={16}
                width={16}
              />
            </Tooltip>
          </div>
        </span>
        <FormDropdown
          disabled={!transferEnabled}
          name="transferDay"
          options={transferDayOptions}
          key={transferDay}
        />
        <div className={style.heightMedium} />
      </Fragment>
    )
  }

  const shouldDisable = (
    !transferEnabled ||
    (transferEnabled && transferInterval !== 'weekly')
  )

  return (
    <Fragment>
      <span className={style.label}>
        {t('pages.add_recipient.transfer_day')}
        {!shouldDisable &&
          <div className={style.tooltip}>
            <Tooltip
              content={t('pages.add_recipient.transfer_tooltip')}
              placement="rightMiddle"
            >
              <IconInfo
                height={16}
                width={16}
              />
            </Tooltip>
          </div>
        }
      </span>
      <FormDropdown
        disabled={shouldDisable}
        name="transferWeekday"
        options={transferWeekdayOptions(t)}
        key={transferWeekday}
      />
      <div className={style.heightMedium} />
    </Fragment>
  )
}

const Transfer = ({ data, t, transferHandler }) => (
  <Fragment>
    <Row>
      <Col tv={12} desk={12} tablet={12} palm={12}>
        <FormCheckbox
          checked={data.transferEnabled}
          label={t('pages.add_recipient.transfer_enabled')}
          name="transferEnabled"
          onChange={transferHandler}
          value="false"
        />
      </Col>
    </Row>
    <Row>
      <Col tv={12} desk={12} tablet={12} palm={12}>
        <span className={style.label}>
          {t('pages.add_recipient.transfer_interval')}
        </span>
        <RadioGroup
          disabled={!data.transferEnabled}
          name="transferInterval"
          options={transferIntervalOptions(t)}
        />
      </Col>
      <Col tv={3} desk={3} tablet={4} palm={4}>
        {renderTransferInput(data, t)}
      </Col>
    </Row>
  </Fragment>
)

Transfer.propTypes = {
  data: PropTypes.shape({
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
    transferDay: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
  transferHandler: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

Transfer.defaultProps = {
  data: {},
}

export default Transfer
