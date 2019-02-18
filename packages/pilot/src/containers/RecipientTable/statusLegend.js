import React from 'react'
import PropTypes from 'prop-types'
import { Legend } from 'former-kit'

import style from './style.css'
import status from '../../models/recipientStatusLegends'

const StatusLegend = ({ item, t }) => (
  <div className={style.centralizedItem}>
    <Legend
      color={status[item.status].color}
      acronym={t(`pages.recipients.status_acronym_of.${item.status}`)}
      hideLabel
    >
      {t(`pages.recipients.status_of.${item.status}`)}
    </Legend>
  </div>
)

StatusLegend.propTypes = {
  item: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default StatusLegend
