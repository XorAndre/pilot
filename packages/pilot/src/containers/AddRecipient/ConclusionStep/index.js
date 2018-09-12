import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  CardContent,
  Spacing,
} from 'former-kit'

import SuccessIcon from './SuccessIcon.svg'
import style from '../style.css'

const ConclusionStep = ({
  onExit,
  onViewDetails,
  t,
}) => (
  <CardContent className={style.flex}>
    <SuccessIcon />
    <p className={style.centerText}>
      {t('pages.add_recipient.recipient_created_success')}
      <br />
      {t('pages.add_recipient.can_see_recipient')}
    </p>
    <div>
      <Button
        fill="outline"
        onClick={onExit}
      >
        {t('pages.add_recipient.exit')}
      </Button>
      <Spacing size="large" />
      <Button
        fill="gradient"
        onClick={onViewDetails}
      >
        {t('pages.add_recipient.see_recipient')}
      </Button>
    </div>
  </CardContent>
)

ConclusionStep.propTypes = {
  onExit: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default ConclusionStep
