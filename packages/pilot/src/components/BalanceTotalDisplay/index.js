import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardContent,
  CardTitle,
} from 'former-kit'

import style from './style.css'

const BalanceTotalDisplay = ({
  action,
  amount,
  detail,
  disabled,
  title,
}) => (
  <Fragment>
    <CardTitle
      className={style.title}
      title={title}
    />
    <CardContent>
      <h2 className={style.amount}>{amount}</h2>
      <div className={style.detail}>
        {detail}
      </div>
      {
        action &&
        <Button
          disabled={disabled}
          fill="gradient"
          onClick={action.onClick}
          size="default"
        >
          {action.title}
        </Button>
      }
    </CardContent>
  </Fragment>
)

BalanceTotalDisplay.propTypes = {
  action: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }),
  amount: PropTypes.string.isRequired,
  detail: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

BalanceTotalDisplay.defaultProps = {
  action: null,
  disabled: false,
}

export default BalanceTotalDisplay
