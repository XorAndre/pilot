import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  either,
  isEmpty,
  isNil,
  map,
  pipe,
  propSatisfies,
  take,
} from 'ramda'

import {
  Button,
  Card,
  CardContent,
  CardSection,
  Col,
  DateInput,
  Grid,
  Row,
  Spacing,
  Tooltip,
} from 'former-kit'

import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

import BalanceSummary from '../../../components/BalanceSummary'
import BalanceTotalDisplay from '../../../components/BalanceTotalDisplay'
import bulkAnticipationsLabels from '../../../models/bulkAnticipationTypes'
import currencyFormatter from '../../../formatters/currency'
import dateFormatter from '../../../formatters/longDate'
import dateLimits from '../../../models/dateSelectorLimits'
import datePresets from '../../../models/dateSelectorPresets'
import getColumns from '../../../components/Operations/operationsTableColumns'
import getColumnsTranslator from '../../../formatters/columnTranslator'
import Operations from '../../../components/Operations'
import operationsTypesLabels from '../../../models/operationTypes'
import PendingRequests from '../../../components/PendingRequests'
import style from './style.css'

const getDateLabels = t => ({
  anyDate: t('dates.any'),
  cancel: t('dates.cancel'),
  confirmPeriod: t('dates.confirm'),
  custom: t('dates.custom'),
  day: t('dates.day'),
  daySelected: t('dates.day_selected'),
  daysSelected: t('dates.selected'),
  end: t('dates.end'),
  noDayOrPeriodSelected: t('dates.no_selected'),
  period: t('dates.period'),
  select: t('dates.select'),
  start: t('dates.start'),
  today: t('dates.today'),
})

const datesEqual = (left, right) => {
  if (left.start === right.start && left.end === right.end) {
    return true
  }

  return (
    moment(left.start).diff(moment(right.start), 'days') === 0
    && moment(right.end).diff(moment(right.end), 'days') === 0
  )
}

const isEmptyDates = either(
  propSatisfies(isNil, 'end'),
  propSatisfies(isNil, 'start')
)

const anyDateRange = {
  end: moment(),
  start: moment().subtract(3, 'months'),
}

const formatAmount = (amount = 0) =>
  currencyFormatter(amount)

class RecipientBalance extends Component {
  constructor (props) {
    super(props)

    this.getPendingRequest = this.getPendingRequest.bind(this)
    this.getPendingRequests = this.getPendingRequests.bind(this)
    this.getSummaryTotal = this.getSummaryTotal.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleOperationsPageChange = this.handleOperationsPageChange.bind(this)
    this.handleRequestCancelClick = this.handleRequestCancelClick.bind(this)
    this.renderAnticipation = this.renderAnticipation.bind(this)

    this.state = {
      dates: {
        end: props.dates.end,
        start: props.dates.start,
      },
    }
  }

  getPendingRequest ({
    amount,
    created_at: createdAt,
    type,
  }) {
    const { t } = this.props
    const title = bulkAnticipationsLabels[type] || '-'
    return {
      amount: currencyFormatter(amount),
      created_at: dateFormatter(createdAt),
      title: t(title),
    }
  }

  getPendingRequests () {
    const {
      requests,
    } = this.props

    const getRequests = pipe(
      take(3),
      map(this.getPendingRequest)
    )

    return getRequests(requests)
  }

  getSummaryTotal () {
    const {
      disabled,
      total,
      t,
    } = this.props

    if (!isEmpty(total)) {
      return {
        outcoming: {
          title: t('pages.balance.total.outcoming'),
          unit: t('currency'),
          value: disabled ? 0 : total.outcoming,
        },
        outgoing: {
          title: t('pages.balance.total.outgoing'),
          unit: t('currency'),
          value: disabled ? 0 : -total.outgoing,
        },
        net: {
          title: t('pages.balance.total.net'),
          unit: t('currency'),
          value: disabled ? 0 : total.net,
        },
      }
    }

    return null
  }

  handleDatesChange (dates) {
    this.setState({ dates })
  }

  handleFilterClick () {
    if (isEmptyDates(this.state.dates)) {
      this.props.onFilterClick(anyDateRange)
    } else {
      this.props.onFilterClick(this.state.dates)
    }
  }

  handleOperationsPageChange (pageIndex) {
    const { onPageChange } = this.props
    onPageChange(pageIndex)
  }

  handleRequestCancelClick (requestIndex) {
    const {
      onCancelRequestClick,
      requests,
    } = this.props

    onCancelRequestClick(requests[requestIndex].id)
  }

  renderAnticipation () {
    const {
      anticipation: {
        available,
        error,
        loading,
      },
      t,
    } = this.props

    if (loading) {
      return (
        <span>
          {t('pages.balance.anticipation_loading')}
        </span>
      )
    }

    if (error) {
      return (
        <span>
          {t('pages.balance.anticipation_error')}
          <Spacing size="tiny" />
          <Tooltip
            placement="rightMiddle"
            content={t('pages.balance.anticipation_error_info')}
          >
            <IconInfo height={16} width={16} />
          </Tooltip>
        </span>
      )
    }

    return (
      <span>
        {t('pages.balance.available_anticipation')}
        <strong> {formatAmount(available)} </strong>
      </span>
    )
  }

  render () {
    const {
      anticipation: {
        error: anticipationError,
        loading: anticipationLoading,
      },
      balance: {
        amount,
        available: {
          withdrawal,
        },
        outcoming,
      },
      currentPage,
      dates,
      disabled,
      onAnticipationClick,
      onCancelRequestClick,
      onWithdrawClick,
      search: {
        operations,
      },
      t,
    } = this.props

    const translateColumns = getColumnsTranslator(t)
    const typesLabels = map(t, operationsTypesLabels)

    const anticipationAction = {
      disabled,
      onClick: onAnticipationClick,
      title: t('pages.balance.anticipation'),
    }

    const withdrawalAction = {
      disabled,
      onClick: onWithdrawClick,
      title: t('pages.balance.withdraw'),
    }

    const filterDatesEqualCurrent = datesEqual(this.state.dates, dates)

    return (
      <Grid>
        <Row stretch>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <CardSection>
              <BalanceTotalDisplay
                action={isNil(onWithdrawClick) ? null : withdrawalAction}
                amount={formatAmount(amount)}
                detail={
                  <span>
                    {t('pages.balance.available_withdrawal')}
                    <strong> {currencyFormatter(withdrawal)} </strong>
                  </span>
                }
                disabled={disabled}
                title={t('pages.balance.withdrawal_title')}
              />
            </CardSection>
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <CardSection>
              <BalanceTotalDisplay
                action={isNil(onAnticipationClick) ? null : anticipationAction}
                amount={formatAmount(outcoming)}
                detail={this.renderAnticipation()}
                disabled={disabled || anticipationLoading || anticipationError}
                title={t('pages.balance.anticipation_title')}
              />
            </CardSection>
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <CardSection>
              <PendingRequests
                emptyMessage={t('pages.balance.pending_requests_empty_message')}
                loading={disabled}
                onCancel={isNil(onCancelRequestClick) ? null : this.handleRequestCancelClick}
                requests={this.getPendingRequests()}
                title={t('pages.balance.pending_requests_title')}
              />
            </CardSection>
          </Col>
        </Row>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <CardSection>
              <CardContent>
                <div className={style.filter}>
                  <DateInput
                    active={filterDatesEqualCurrent}
                    value={this.state.dates}
                    disabled={disabled}
                    icon={<IconCalendar width={16} height={16} />}
                    limits={dateLimits}
                    onChange={this.handleDatesChange}
                    presets={datePresets}
                    strings={getDateLabels(this.props.t)}
                  />
                  <Button
                    disabled={filterDatesEqualCurrent}
                    fill="gradient"
                    onClick={this.handleFilterClick}
                    size="default"
                  >
                    {t('filter_action')}
                  </Button>
                </div>
              </CardContent>
              <CardContent>
                <Card>
                  <CardContent>
                    <BalanceSummary
                      amount={this.getSummaryTotal()}
                      dates={dates}
                    />
                  </CardContent>
                </Card>
              </CardContent>
              <Operations
                columns={translateColumns(getColumns(typesLabels))}
                currentPage={currentPage}
                disabled={disabled}
                emptyMessage={t('models.operations.empty_message')}
                exportLabel={t('models.operations.export')}
                loading={disabled}
                ofLabel={t('of')}
                onExport={() => null}
                onPageChange={this.handleOperationsPageChange}
                rows={operations.rows}
                subtitle={
                  <span>
                    {t('pages.balance.total.of')}
                    <strong> {operations.total} </strong>
                    {t('pages.balance.releases')}
                  </span>
                }
                title={t('pages.balance.operations_title')}
                totalPages={operations.count}
              />
            </CardSection>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const cashFlowShape = PropTypes.arrayOf(
  PropTypes.shape({
    amount: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })
).isRequired

const numberOrStringShape = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
]).isRequired

RecipientBalance.propTypes = {
  anticipation: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    available: PropTypes.number,
  }).isRequired,
  balance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    available: PropTypes.shape({
      withdrawal: PropTypes.number.isRequired,
    }),
    outcoming: PropTypes.number.isRequired,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  dates: PropTypes.shape({
    end: PropTypes.instanceOf(moment),
    start: PropTypes.instanceOf(moment),
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  onAnticipationClick: PropTypes.func.isRequired,
  onCancelRequestClick: PropTypes.func,
  onFilterClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onWithdrawClick: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    created_at: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  search: PropTypes.shape({
    operations: PropTypes.shape({
      count: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired,
      rows: PropTypes.arrayOf(
        PropTypes.shape({
          id: numberOrStringShape,
          net: PropTypes.number.isRequired,
          outcoming: cashFlowShape,
          outgoing: cashFlowShape,
          payment_date: PropTypes.shape({
            original: PropTypes.string,
            actual: PropTypes.string.isRequired,
          }),
          type: PropTypes.string.isRequired,
        })
      ),
      total: PropTypes.number.isRequired,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
  total: PropTypes.shape({
    net: PropTypes.number,
    outcoming: PropTypes.number,
    outgoing: PropTypes.number,
  }),
}

RecipientBalance.defaultProps = {
  onCancelRequestClick: null,
  total: {},
}

export default RecipientBalance
