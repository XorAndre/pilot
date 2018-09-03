import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  complement,
  either,
  isEmpty,
  isNil,
  keys,
  map,
  pipe,
  prop,
  propSatisfies,
  take,
  when,
} from 'ramda'

import {
  Button,
  Card,
  CardContent,
  CardSection,
  Col,
  DateInput,
  Grid,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Row,
  Spacing,
  Tooltip,
} from 'former-kit'

import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

import BalanceSummary from '../../components/BalanceSummary'
import BalanceTotalDisplay from '../../components/BalanceTotalDisplay'
import bulkAnticipationsLabels from '../../models/bulkAnticipationTypes'
import currencyFormatter from '../../formatters/currency'
import dateFormatter from '../../formatters/longDate'
import dateLimits from '../../models/dateSelectorLimits'
import dateInputPresets from '../../models/dateSelectorPresets'
import DetailsHead from '../../components/DetailsHead'
import getColumns from '../../components/Operations/operationsTableColumns'
import getColumnsTranslator from '../../formatters/columnTranslator'
import Operations from '../../components/Operations'
import operationsTypesLabels from '../../models/operationTypes'
import PendingRequests from '../../components/PendingRequests'
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

const isSameDay = date =>
  moment(date).isSame(moment(), 'day')

const isNotNullOrEmpty = complement(either(isNil, isEmpty))

const isValidDateAndSameDay = when(
  isNotNullOrEmpty,
  pipe(
    prop('payment_date'),
    isSameDay
  )
)

/*
 * TODO: remove this limits when the 'any date' option is removed
 * from the DateSelector.
*/
const anyDateRange = {
  end: moment(),
  start: moment().subtract(3, 'months'),
}

const formatAmount = (amount = 0) =>
  currencyFormatter(amount)

class Balance extends Component {
  constructor (props) {
    super(props)

    this.getHeadProp = this.getHeadProp.bind(this)
    this.getHeadProperties = this.getHeadProperties.bind(this)
    this.getPendingRequest = this.getPendingRequest.bind(this)
    this.getPendingRequests = this.getPendingRequests.bind(this)
    this.getSummaryTotal = this.getSummaryTotal.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleOperationsPageChange = this.handleOperationsPageChange.bind(this)
    this.handlePresetChange = this.handlePresetChange.bind(this)
    this.handleRequestCancelClick = this.handleRequestCancelClick.bind(this)
    this.renderAnticipation = this.renderAnticipation.bind(this)

    this.localizedPresets = dateInputPresets(props.t)
    this.dateLabels = getDateLabels(props.t)

    this.state = {
      dates: {
        end: props.dates.end,
        start: props.dates.start,
      },
      showDateInputCalendar: false,
    }
  }

  getHeadProp (key) {
    const {
      recipient: {
        bank_account, // eslint-disable-line camelcase
        id,
      },
      t,
    } = this.props
    const getTranslatedChild = () => {
      const childrenValue = bank_account[key]
      if (key === 'bank_code') {
        return t(`models.${key}.${childrenValue}`)
      }
      if (key === 'type') {
        return t(childrenValue)
      }
      if (key === 'id') {
        return id
      }
      return childrenValue
    }

    return ({
      children: <span>{getTranslatedChild()}</span>,
      title: t(`pages.balance.${key}`),
    })
  }

  getHeadProperties () {
    const {
      recipient: {
        bank_account: {
          account,
          agency,
          bank_code, // eslint-disable-line camelcase
          type,
        },
        id,
      },
    } = this.props

    return map(this.getHeadProp, keys({
      account,
      agency,
      bank_code,
      id,
      type,
    }))
  }

  getPendingRequest ({
    amount,
    created_at, // eslint-disable-line camelcase
    status,
    type,
  }) {
    const { t } = this.props
    const { statuses, types } = bulkAnticipationsLabels
    const title =
      `${t(types[type])} ${t(statuses[status])}` || '-'

    return {
      amount: currencyFormatter(amount),
      created_at: dateFormatter(created_at),
      title,
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
      t,
      total,
    } = this.props

    if (!isEmpty(total)) {
      return {
        outcoming: {
          title: t('pages.balance.total.outcoming'),
          unit: t('currency'),
          value: disabled
            ? 0
            : total.outcoming,
        },
        outgoing: {
          title: t('pages.balance.total.outgoing'),
          unit: t('currency'),
          value: disabled
            ? 0
            : -total.outgoing,
        },
        net: { // eslint-disable-line sort-keys
          title: t('pages.balance.total.net'),
          unit: t('currency'),
          value: disabled
            ? 0
            : total.net,
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

  handlePresetChange () {
    this.setState({
      showDateInputCalendar: true,
    })
  }

  handleRequestCancelClick (requestIndex) {
    const {
      onCancelRequestClick,
      requests,
    } = this.props

    onCancelRequestClick(requests[requestIndex])
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
      anticipationCancel,
      balance: {
        amount,
        available: {
          withdrawal,
        },
        outcoming,
      },
      company,
      currentPage,
      dates,
      disabled,
      modalConfirmOpened,
      onAnticipationClick,
      onCancelRequestClick,
      onCancelRequestClose,
      onConfirmCancelPendingRequest,
      onExport,
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
      <Fragment>
        <Grid>
          <Row stretch>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              <Card>
                <CardContent>
                  <DetailsHead
                    identifier={company.name}
                    properties={this.getHeadProperties()}
                    title={t('pages.balance.recipient')}
                  />
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Row stretch>
            <Col
              desk={4}
              palm={12}
              tablet={6}
              tv={4}
            >
              <BalanceTotalDisplay
                action={
                  isNil(onWithdrawClick)
                    ? null
                    : withdrawalAction
                }
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
            </Col>
            <Col
              desk={4}
              palm={12}
              tablet={6}
              tv={4}
            >
              <BalanceTotalDisplay
                action={
                  isNil(onAnticipationClick)
                  ? null
                  : anticipationAction
                }
                amount={formatAmount(outcoming)}
                detail={this.renderAnticipation()}
                disabled={disabled || anticipationLoading || anticipationError}
                title={t('pages.balance.anticipation_title')}
              />
            </Col>
            <Col
              desk={4}
              palm={12}
              tablet={6}
              tv={4}
            >
              <PendingRequests
                emptyMessage={t('pages.balance.pending_requests_empty_message')}
                loading={disabled}
                onCancel={
                  isNil(onCancelRequestClick)
                  ? null
                  : this.handleRequestCancelClick
                }
                requests={this.getPendingRequests()}
                title={t('pages.balance.pending_requests_title')}
              />
            </Col>
          </Row>
          <Row>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              <Card className={style.allowOverflow}>
                <CardContent>
                  <div className={style.filter}>
                    <DateInput
                      active={filterDatesEqualCurrent}
                      disabled={disabled}
                      icon={<IconCalendar width={16} height={16} />}
                      limits={dateLimits}
                      onChange={this.handleDatesChange}
                      onPresetChange={this.handlePresetChange}
                      presets={this.localizedPresets}
                      selectedPreset="last-7"
                      strings={this.dateLabels}
                      showCalendar={this.state.showDateInputCalendar}
                      dates={this.state.dates}
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
                  <CardSection>
                    <CardContent>
                      <BalanceSummary
                        amount={this.getSummaryTotal()}
                        dates={dates}
                      />
                    </CardContent>
                  </CardSection>
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              <Card>
                <Operations
                  onExportData={onExport}
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
              </Card>
            </Col>
          </Row>
        </Grid>

        <Modal isOpen={modalConfirmOpened}>
          <ModalTitle
            closeIcon={<IconClose width={16} height={16} />}
            onClose={onCancelRequestClose}
            title={t('cancel_pending_request_title')}
          />
          <ModalContent>
            <div className={style.modalAlignContent}>
              {
                isValidDateAndSameDay(anticipationCancel)
                  ?
                    <Fragment>
                      <span>
                        {t('cancel_pending_request_text_today')}
                        <br />
                        <br />
                        {t('cancel_pending_request_text_today_confirm')}
                      </span>
                    </Fragment>
                  : t('cancel_pending_request_text')
              }
            </div>
          </ModalContent>
          <ModalActions>
            <div className={style.modalAlignContent}>
              <Button
                fill="outline"
                onClick={onCancelRequestClose}
              >
                {t('cancel_pending_request_cancel')}
              </Button>
              <Spacing size="small" />
              <Button
                fill="gradient"
                onClick={onConfirmCancelPendingRequest}
              >
                {t('cancel_pending_request_confirm')}
              </Button>
            </div>
          </ModalActions>
        </Modal>
      </Fragment>
    )
  }
}

const cashFlowShape = PropTypes.arrayOf(PropTypes.shape({
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})).isRequired

const numberOrStringShape = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
]).isRequired

const datesShape = PropTypes.shape({
  end: PropTypes.instanceOf(moment),
  start: PropTypes.instanceOf(moment),
})

Balance.propTypes = {
  anticipation: PropTypes.shape({
    available: PropTypes.number,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  anticipationCancel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    payment_date: PropTypes.string.isRequired,
  }),
  balance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    available: PropTypes.shape({
      withdrawal: PropTypes.number.isRequired,
    }),
    outcoming: PropTypes.number.isRequired,
  }).isRequired,
  company: PropTypes.shape({
    id: numberOrStringShape.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  dates: datesShape.isRequired, // eslint-disable-line react/no-typos
  disabled: PropTypes.bool.isRequired,
  modalConfirmOpened: PropTypes.bool,
  onAnticipationClick: PropTypes.func.isRequired,
  onCancelRequestClick: PropTypes.func,
  onCancelRequestClose: PropTypes.func,
  onConfirmCancelPendingRequest: PropTypes.func,
  onExport: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onWithdrawClick: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    bank_account: PropTypes.shape({
      account: PropTypes.string.isRequired,
      agency: PropTypes.string.isRequired,
      bank_code: PropTypes.string.isRequired,
      id: numberOrStringShape,
      type: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
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
      rows: PropTypes.arrayOf(PropTypes.shape({
        id: numberOrStringShape,
        net: PropTypes.number.isRequired,
        outcoming: cashFlowShape,
        outgoing: cashFlowShape,
        payment_date: PropTypes.shape({
          actual: PropTypes.string.isRequired,
          original: PropTypes.string,
        }),
        type: PropTypes.string.isRequired,
      })),
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

Balance.defaultProps = {
  anticipationCancel: null,
  modalConfirmOpened: false,
  onCancelRequestClick: null,
  onCancelRequestClose: null,
  onConfirmCancelPendingRequest: null,
  total: {},
}

export default Balance
