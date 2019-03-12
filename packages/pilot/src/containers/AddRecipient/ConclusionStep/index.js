import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  CardContent,
  Spacing,
} from 'former-kit'

import SuccessIcon from './SuccessIcon.svg'
import style from '../style.css'
import { virtualPageView } from '../../../vendor/googleTagManager'

class ConclusionStep extends Component {
  componentDidMount () {
    virtualPageView({
      path: '/virtual/recipient/add/conclusion',
      title: 'Add Recipient - Conclusion',
    })
  }

  render () {
    const {
      onExit,
      onViewDetails,
      t,
    } = this.props
    return (
      <CardContent className={style.flex}>
        <SuccessIcon />
        <h2 className={style.title}>
          {t('pages.add_recipient.everything_ok')}
        </h2>
        <p className={style.centerText}>
          {t('pages.add_recipient.recipient_created_success')}
          <br />
          {t('pages.add_recipient.can_see_recipient')}
        </p>
        <div>
          <Button fill="outline" onClick={onExit}>
            {t('pages.add_recipient.exit')}
          </Button>
          <Spacing size="large" />
          <Button fill="gradient" onClick={onViewDetails}>
            {t('pages.add_recipient.see_recipient')}
          </Button>
        </div>
      </CardContent>
    )
  }
}

ConclusionStep.propTypes = {
  onExit: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default ConclusionStep
