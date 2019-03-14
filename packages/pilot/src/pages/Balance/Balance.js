import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import qs from 'qs'
import {
  __,
  always,
  anyPass,
  applySpec,
  assoc,
  complement,
  compose,
  defaultTo,
  either,
  identity,
  invoker,
  isEmpty,
  isNil,
  juxt,
  merge,
  mergeAll,
  path,
  pathOr,
  pipe,
  propEq,
  tail,
  test,
  uncurryN,
  unless,
  when,
} from 'ramda'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { Alert } from 'former-kit'
import { withError } from '../ErrorBoundary'
import {
  requestBalance,
  receiveBalance,
} from './actions'
import BalanceContainer from '../../containers/Balance'
import env from '../../environment'

const getBulkAnticipationsLimits = (client, recipientId) => {
  const now = moment()

  return client
    .business
    .requestBusinessCalendar(now.year())
    .then(calendar => client
      .business
      .nextAnticipableBusinessDay(calendar, { hour: 10 }, now))
    .then(paymentDate => paymentDate.valueOf())
    .then(assoc('payment_date', __, { recipientId, timeframe: 'start' }))
    .then(client.bulkAnticipations.limits)
}

const mapStateToProps = ({
  account: {
    client,
    company,
    sessionId,
    user,
  },
  balance: {
    error,
    loading,
    query,
  },
}) => ({
  client,
  company,
  error,
  loading,
  query,
  sessionId,
  user,
})

const mapDispatchToProps = dispatch => ({
  onReceiveBalance: ({ query }) => {
    dispatch(receiveBalance({ query }))
  },
  onRequestBalance: (query) => {
    dispatch(requestBalance(query))
  },
  onRequestBalanceFail: (error) => {
    dispatch(receiveBalance(error))
  },
})

const enhanced = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withError
)

const isNilOrEmpty = anyPass([isNil, isEmpty])

const momentToISOString = unless(
  isNilOrEmpty,
  pipe(moment, invoker(0, 'toISOString'))
)

const stringToMoment = unless(
  isNilOrEmpty,
  moment
)

const queryDatesToISOString = applySpec({
  dates: {
    end: pipe(path(['dates', 'end']), momentToISOString),
    start: pipe(path(['dates', 'start']), momentToISOString),
  },
})

const queryDatesToMoment = applySpec({
  dates: {
    end: pipe(path(['dates', 'end']), stringToMoment),
    start: pipe(path(['dates', 'start']), stringToMoment),
  },
})

const normalizeTo = (defaultValue, propPath) => pipe(
  path(propPath),
  when(
    either(isNil, isEmpty),
    defaultTo(defaultValue)
  )
)

const normalizeQueryStructure = applySpec({
  count: pipe(
    normalizeTo(15, ['count']),
    Number
  ),
  page: pipe(
    normalizeTo(1, ['page']),
    Number
  ),
})

const parseQueryUrl = pipe(
  tail,
  qs.parse,
  juxt([
    identity,
    queryDatesToMoment,
    normalizeQueryStructure,
  ]),
  mergeAll
)

const isRecipientId = test(/^re_/)

const isNotRecipientId = complement(isRecipientId)

const getValidId = uncurryN(2, defaultId => unless(
  complement(anyPass([
    isNil,
    Number.isNaN,
    isEmpty,
    isNotRecipientId,
  ])),
  always(defaultId)
))

const getRecipientId = pathOr(null, ['default_recipient_id', env])
const getAnticipationAmount = path(['maximum', 'amount'])

const cancelBulkAnticipation = ({ bulkId, recipientId }, client) =>
  client.bulkAnticipations.cancel({
    id: bulkId,
    recipientId,
  })

const userIsReadOnly = propEq('permission', 'read_only')

const handleExportDataSuccess = (res, format) => {
  /* eslint-disable no-undef */
  let contentType
  if (format === 'xlsx') {
    contentType = 'application/ms-excel'
  } else {
    contentType = 'text/csv;charset=utf-8'
  }

  const blob = new Blob([res], { type: contentType })
  const filename = `PagarMe_Extrato_${moment().format('DD/MM/YYYY')}.${format}`

  const downloadLink = document.createElement('a')
  downloadLink.target = '_blank'
  downloadLink.download = filename
  const URL = window.URL || window.webkitURL
  const downloadUrl = URL.createObjectURL(blob)
  downloadLink.href = downloadUrl
  document.body.append(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(downloadUrl)
  /* eslint-enable no-undef */
}

class Balance extends Component {
  constructor (props) {
    super(props)

    this.state = {
      anticipation: {
        available: 0,
        error: false,
        loading: false,
      },
      anticipationCancel: null,
      modalOpened: false,
      query: {
        count: 10,
        dates: {
          end: moment(),
          start: moment().subtract(7, 'days'),
        },
        page: 1,
      },
      result: {},
      total: {},
    }

    this.handleAnticipation = this.handleAnticipation.bind(this)
    this.handleCancelRequest = this.handleCancelRequest.bind(this)
    this.handleCloseConfirmCancel = this.handleCloseConfirmCancel.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleExportData = this.handleExportData.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handleOpenConfirmCancel = this.handleOpenConfirmCancel.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleWithdraw = this.handleWithdraw.bind(this)
    this.requestAnticipationLimits = this.requestAnticipationLimits.bind(this)
    this.requestData = this.requestData.bind(this)
    this.requestTotal = this.requestTotal.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }

  componentDidMount () {
    const {
      history: {
        location,
      },
      match: {
        params,
      },
    } = this.props
    const urlBalanceQuery = location.search

    if (isEmpty(urlBalanceQuery)) {
      this.updateQuery(this.state.query, params.id)
    } else {
      this.requestData(params.id, parseQueryUrl(urlBalanceQuery))
      this.requestTotal(params.id, parseQueryUrl(urlBalanceQuery))
      this.requestAnticipationLimits(params.id)
    }
  }

  componentDidUpdate (prevProps) {
    const {
      location: {
        search: oldSearch,
      },
      match: {
        params: {
          id: oldRecipientId,
        },
      },
    } = prevProps

    const {
      company,
      location: {
        search: newSearch,
      },
      match: {
        params: {
          id: newRecipientId,
        },
      },
    } = this.props

    if (oldSearch !== newSearch) {
      this.requestData(newRecipientId, parseQueryUrl(newSearch))
      this.requestTotal(newRecipientId, parseQueryUrl(newSearch))
    }
    if (oldRecipientId !== newRecipientId) {
      this.requestAnticipationLimits(newRecipientId)
    }
    if (
      !oldSearch
      && !newSearch
      && company
      && company.default_recipient_id
    ) {
      const pathId = getValidId(getRecipientId(company), null)
      this.updateQuery(this.state.query, pathId)
    }
  }

  updateQuery (query, id) {
    const buildBalanceQuery = pipe(
      queryDatesToISOString,
      merge(query),
      qs.stringify
    )

    const queryObject = isNilOrEmpty(query)
      ? this.state.stateQuery
      : query
    const pathId = getValidId(getRecipientId(this.props.company), id)

    const {
      history,
      match: {
        params,
      },
    } = this.props

    if (pathId) {
      history.replace({
        pathname: pathId,
        search: buildBalanceQuery(queryObject),
      })
    } else if (params.id === ':id') {
      history.replace('/balance')
    }
  }

  requestAnticipationLimits (id) {
    const { client } = this.props
    this.setState({
      anticipation: {
        error: false,
        loading: true,
      },
    })

    return getBulkAnticipationsLimits(client, id)
      .then((anticipationLimits) => {
        this.setState({
          anticipation: {
            available: getAnticipationAmount(anticipationLimits),
            error: false,
            loading: false,
          },
        })
      })
      .catch((error) => {
        this.props.throwError(error)
        this.setState({
          anticipation: {
            error: true,
            loading: false,
          },
        })
      })
  }

  requestTotal (id, searchQuery) {
    return this.props.client
      .balance
      .total(id, searchQuery)
      .then((total) => {
        this.setState({ total })
      })
      // TODO add catch when BalanceSummary have loading state
  }

  requestData (id, searchQuery) {
    this.props.onRequestBalance({ searchQuery })

    return this.props.client
      .balance
      .data(id, searchQuery)
      .then(({ query, result }) => {
        this.setState({
          query,
          result,
        })

        this.props.onReceiveBalance(query)
      })
      .catch((error) => {
        this.props.onRequestBalanceFail(error)
      })
  }

  handleAnticipation () {
    const {
      company,
      history,
    } = this.props

    history.push(`/anticipation/${getRecipientId(company)}`)
  }

  handleCancelRequest () {
    const { client, company } = this.props
    const recipientId = getRecipientId(company)
    const { id: bulkId } = this.state.anticipationCancel

    cancelBulkAnticipation({
      bulkId,
      recipientId,
    }, client)
      .then(() => client.bulkAnticipations.findPendingRequests(recipientId))
      .then(response => this.setState({
        ...this.state,
        modalOpened: false,
        result: {
          ...this.state.result,
          requests: response,
        },
      }))
  }

  handleExportData (format) {
    const { client, company } = this.props
    const { query } = this.state
    const startDate = query.dates.start.format('x')
    const endDate = query.dates.end.format('x')

    const recipientId = getRecipientId(company)
    return client
      .withVersion('2019-02-18')
      .balanceOperations
      .find({
        endDate,
        format,
        recipientId,
        startDate,
      })
      .then(res => handleExportDataSuccess(res, format))
  }

  handleDateChange (dates) {
    const { query } = this.state

    this.setState({
      query: merge(query, { dates }),
    })
  }

  handleFilterClick (dates) {
    const {
      query,
    } = this.props

    const nextQuery = {
      ...query,
      ...this.state.query,
      dates,
      page: 1,
    }

    this.updateQuery(nextQuery)
  }

  handlePageChange (page) {
    const query = {
      ...this.state.query,
      page,
    }

    this.updateQuery(query)
  }

  handleWithdraw () {
    const {
      company,
      history,
    } = this.props

    history.push(`/withdraw/${getRecipientId(company)}`)
  }

  handleOpenConfirmCancel (anticipation) {
    this.setState({
      ...this.state,
      anticipationCancel: anticipation,
      modalOpened: true,
    })
  }

  handleCloseConfirmCancel () {
    this.setState({
      ...this.state,
      anticipationCancel: null,
      modalOpened: false,
    })
  }

  render () {
    const {
      company,
      error,
      loading,
      t,
      user,
    } = this.props

    const {
      anticipation,
      anticipationCancel,
      modalOpened,
      query: {
        dates,
        page,
      },
      result: {
        balance,
        recipient,
        requests,
        search,
      },
      total,
    } = this.state

    const isEmptyResult = isNilOrEmpty(this.state.result.search)
    const hasDefaultRecipient = !isNilOrEmpty(getRecipientId(company))
    const hasCompany = !isNil(company)

    if (error) {
      return (
        <Alert
          icon={<IconInfo height={16} width={16} />}
          type="info"
        >
          <span>
            {pathOr(
              t('pages.balance.unknown_error'),
              ['errors', 0, 'message'],
              error
            )}
          </span>
        </Alert>
      )
    }

    if (!hasDefaultRecipient && hasCompany) {
      return (
        <Alert
          icon={<IconInfo height={16} width={16} />}
          type="info"
        >
          <span>{t('pages.balance.invalid_recipient')}</span>
        </Alert>
      )
    }

    if (!isEmptyResult && hasCompany) {
      return (
        <BalanceContainer
          anticipation={anticipation}
          anticipationCancel={anticipationCancel}
          balance={balance}
          company={company}
          currentPage={page}
          dates={dates}
          disabled={loading}
          modalConfirmOpened={modalOpened}
          onAnticipationClick={this.handleAnticipation}
          onCancelRequestClick={userIsReadOnly(user)
            ? null
            : this.handleOpenConfirmCancel
          }
          onCancelRequestClose={this.handleCloseConfirmCancel}
          onConfirmCancelPendingRequest={this.handleCancelRequest}
          onExport={this.handleExportData}
          onFilterClick={this.handleFilterClick}
          onPageChange={this.handlePageChange}
          onWithdrawClick={this.handleWithdraw}
          recipient={recipient}
          requests={requests}
          search={search}
          t={t}
          total={total}
        />
      )
    }

    return null
  }
}

Balance.propTypes = {
  client: PropTypes.shape({
    balance: PropTypes.shape({
      data: PropTypes.func.isRequired,
      total: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  company: PropTypes.shape({
    default_recipient_id: PropTypes.shape({
      live: PropTypes.string,
      test: PropTypes.string,
    }).isRequired,
  }),
  error: PropTypes.shape({
    errors: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string,
    })),
  }),
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onReceiveBalance: PropTypes.func.isRequired,
  onRequestBalance: PropTypes.func.isRequired,
  onRequestBalanceFail: PropTypes.func.isRequired,
  query: PropTypes.shape({
    dates: {
      end: PropTypes.string,
      start: PropTypes.string,
    },
  }),
  t: PropTypes.func.isRequired,
  throwError: PropTypes.func,
  user: PropTypes.shape({
    permission: PropTypes.oneOf([
      'admin', 'read_only', 'write',
    ]).isRequired,
  }),
}

Balance.defaultProps = {
  company: null,
  error: null,
  query: null,
  throwError: identity,
  user: null,
}

export default enhanced(Balance)
