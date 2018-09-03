import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import { merge } from 'ramda'

import {
  Card,
  CardContent,
} from 'former-kit'

import RecipientBalance from '../../../../src/containers/RecipientDetails/RecipientBalance'
import Section from '../../../Section'
import mock from '../../../../src/containers/Balance/mock.json'


class RecipientBalanceState extends Component {
  constructor () {
    super()

    this.handleDateChange = this.handleDateChange.bind(this)
    this.state = {
      anticipation: {
        available: 10000,
        error: false,
        loading: false,
      },
      dates: {
        end: moment().add(1, 'month'),
        start: moment(),
      },
      ...mock,
      query: {
        dates: {
          end: moment().add(1, 'month'),
          start: moment(),
        },
        page: 1,
      },
      total: {
        net: 1000000,
        outcoming: 1000000,
        outgoing: 1000000,
      },
    }
  }

  handleDateChange (dates) {
    const { query } = this.state
    action('date change')
    this.setState({
      query: merge(query, { dates }),
    })
  }


  render () {
    const {
      anticipation,
      dates,
      result: {
        requests,
        balance,
        search,
      },
      query,
      total,
    } = this.state

    return (
      <Section>
        <Card>
          <CardContent>
            <RecipientBalance
              anticipation={anticipation}
              balance={balance}
              currentPage={query.page}
              dates={dates}
              disabled={false}
              onAnticipationClick={action('anticipation')}
              onCancelRequestClick={action('cancel request')}
              onFilterClick={action('filter click')}
              onPageChange={action('page click')}
              onWithdrawClick={action('withdraw')}
              requests={requests}
              search={search}
              t={t => t}
              total={total}
            />
          </CardContent>
        </Card>
      </Section>
    )
  }
}

export default RecipientBalanceState
