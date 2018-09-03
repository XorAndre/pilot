import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardContent,
  CardTitle,
} from 'former-kit'
import { isEmpty } from 'ramda'

import IconClose from 'emblematic-icons/svg/ClearClose24.svg'

import style from './style.css'

/* eslint-disable camelcase */
const renderRequests = (requests, onCancelHandler) => requests.map((
  {
    amount,
    created_at,
    title: requestTitle,
  },
  index
) => (
  <tr
    key={`${created_at}_${requestTitle}_${amount}`}
  >
    <td className={style.createdAt}>{created_at}</td>
    <td>{requestTitle}</td>
    <td className={style.amount}>{amount}</td>
    {onCancelHandler &&
      <td className={style.cancel}>
        <Button
          fill="outline"
          icon={<IconClose width={12} height={12} />}
          onClick={() => onCancelHandler(index)}
          size="tiny"
        />
      </td>
    }
  </tr>
))
/* eslint-enable camelcase */

const PendingRequests = ({
  emptyMessage,
  onCancel,
  requests,
  title,
}) => (
  <Fragment>
    <CardTitle className={style.title} title={title} />
    <CardContent>
      {!isEmpty(requests) &&
        <table className={style.table}>
          <tbody>
            {renderRequests(requests, onCancel)}
          </tbody>
        </table>
      }
      {isEmpty(requests) &&
        <p>{emptyMessage}</p>
      }
    </CardContent>
  </Fragment>
)

PendingRequests.defaultProps = {
  onCancel: null,
}

PendingRequests.propTypes = {
  emptyMessage: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  requests: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired, // eslint-disable-line camelcase
    title: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
}

export default PendingRequests
