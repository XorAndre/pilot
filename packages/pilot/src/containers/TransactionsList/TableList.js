import React from 'react'
import { omit } from 'ramda'
import { Table } from 'former-kit'

import withLoader from '../../components/withLoader'

import style from './style.css'

/* eslint-disable */
const withSpinner = withLoader(
  <div className={style.overlay}>
    <span className={style.spinner} />
  </div>
)
/* eslint-enable */

const TableList = props => (
  <Table {...omit(['loading'], props)} />
)

export default withSpinner(TableList)
