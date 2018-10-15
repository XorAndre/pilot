import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import qs from 'qs'
import {
  append,
  applySpec,
  compose,
  contains,
  defaultTo,
  either,
  flatten,
  identity,
  isEmpty,
  isNil,
  juxt,
  mergeAll,
  path,
  pipe,
  replace,
  tail,
  when,
  without,
} from 'ramda'
import {
  requestSearch,
  receiveSearch,
} from './actions'
import { requestLogout } from '../../Account/actions'

import dateSelectorPresets from '../../../models/dateSelectorPresets'
import RecipientsList from '../../../containers/RecipientsList'

const mapStateToProps = ({
  account: { client },
  recipients: { loading, query },
}) => ({ client, loading, query })

const mapDispatchToProps = ({
  onReceiveSearch: receiveSearch,
  onRequestSearch: requestSearch,
  onRequestSearchFail: requestLogout,
})

const enhanced = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const normalizeTo = (defaultValue, propPath) => pipe(
  path(propPath),
  when(
    either(isNil, isEmpty),
    defaultTo(defaultValue)
  )
)

const normalizeQueryStructure = applySpec({
  count: pipe(normalizeTo(15, ['count']), Number),
  offset: pipe(normalizeTo(1, ['offset']), Number),
  search: normalizeTo('', ['search']),
  sort: {
    field: normalizeTo(['created_at'], ['sort', 'field']),
    order: normalizeTo('descending', ['sort', 'order']),
  },
})

const parseQueryUrl = pipe(
  tail,
  qs.parse,
  juxt([
    identity,
    normalizeQueryStructure,
  ]),
  mergeAll
)

const isRecipientId = (recipientText) => {
  const recipientPattern = /^(re_)(\w){25}/
  return recipientPattern.test(recipientText)
}

const isBankAccount = (bankAccount) => {
  const bankNumber = Number.parseInt(bankAccount, 10)
  return Number.isInteger(bankNumber)
}

class RecipientsSearch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      expandedRows: [],
      result: {
        chart: {
          dataset: [],
        },
        list: {
          rows: [],
        },
        total: {},
      },
      selectedRows: [],
    }

    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleFilterClear = this.handleFilterClear.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleRowDetailsClick = this.handleRowDetailsClick.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    this.handleViewModeChange = this.handleViewModeChange.bind(this)

    this.requestData = this.requestData.bind(this)
  }

  componentDidMount () {
    const urlSearchQuery = this.props.history.location.search
    if (isEmpty(urlSearchQuery)) {
      this.updateQuery(this.props.query)
    } else {
      this.requestData(parseQueryUrl(urlSearchQuery))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { location: { search } } = this.props
    const { location } = nextProps

    if (search !== location.search) {
      this.requestData(parseQueryUrl(location.search))
    }
  }

  updateQuery (query) {
    const {
      history: {
        location,
        push,
      },
    } = this.props

    const buildSearchQuery = qs.stringify

    const newQuery = buildSearchQuery(query)
    const currentQuery = replace('?', '', location.search)

    this.setState({
      expandedRows: [],
      selectedRows: [],
    })

    if (currentQuery !== newQuery) {
      push({
        pathname: 'recipients',
        search: newQuery,
      })
    }
  }

  requestData (query) {
    this.props.onRequestSearch({ query })

    const findByQuery = ({
      count,
      offset,
      search,
    }) => {
      let key = 'name'

      if (search) {
        if (isRecipientId(search)) {
          key = 'id'
        } else if (isBankAccount(search)) {
          key = 'bank_account_id'
        }
      }

      return this.props.client
        .recipients
        .find({
          count,
          [key]: search,
          page: offset,
        })
        .then(recipients => [recipients])
        .catch((error) => {
          this.props.onRequestSearchFail(error)
        })
    }

    const findByExternalId = ({
      count,
      offset,
      search,
    }) => {
      if (search &&
          !isRecipientId(search)) {
        return this.props.client
          .recipients
          .find({
            count,
            external_id: search,
            page: offset,
          })
          .catch((error) => {
            this.props.onRequestSearchFail(error)
          })
      }

      return Promise.resolve([])
    }

    return Promise.all([
      findByExternalId(query),
      findByQuery(query),
    ])
      .then(res => flatten(res))
      .then((res) => {
        const result = {
          list: {
            rows: res,
          },
          total: {
            count: res.length,
            offset: query.offset,
          },
        }

        this.setState({
          result,
        })

        this.props.onReceiveSearch({
          query,
          rows: res,
        })
      })
      .catch((error) => {
        this.props.onRequestSearchFail(error)
      })
  }

  handlePageCountChange (count) {
    const query = {
      ...this.props.query,
      count,
      offset: 1,
    }

    this.updateQuery(query)
  }

  handleOrderChange (field) {
    const query = {
      ...this.props.query,
      offset: 1,
      sort: {
        field,
      },
    }

    this.updateQuery(query)
  }

  handleFilterClear () {
    this.updateQuery({ })
  }

  handleFilterChange (filters) {
    const {
      search,
    } = filters

    const query = {
      ...this.props.query,
      offset: 1,
      search,
    }

    this.updateQuery(query)
  }

  handlePageChange (page) {
    const query = {
      ...this.props.query,
      offset: page,
    }

    this.updateQuery(query)
  }

  handleRowDetailsClick (row) {
    const recipient = this.state.result.list.rows[row]
    const { history } = this.props
    history.push(`/recipients/detail/${recipient.id}`)
  }

  handleRowClick (index) {
    const { expandedRows } = this.state
    this.setState({
      expandedRows: contains(index, expandedRows)
        ? without([index], expandedRows)
        : append(index, expandedRows),
    })
  }

  handleViewModeChange (viewMode) {
    this.setState({
      viewMode,
    })
  }

  handleExpandRow (expandedRows) {
    this.setState({
      expandedRows,
    })
  }

  handleSelectRow (selectedRows) {
    this.setState({
      selectedRows,
    })
  }

  render () {
    const {
      collapsed,
      columns,
      expandedRows,
      result: {
        list,
      },
      selectedRows,
      viewMode,
    } = this.state

    const {
      history: {
        push,
      },
      loading,
      query,
      query: {
        count,
        offset,
      },
      t,
    } = this.props

    const pagination = {
      offset,
      total: list.rows.length === count
        ? 100
        : offset,
    }

    return (
      <RecipientsList
        amount={0}
        collapsed={collapsed}
        columns={columns}
        count={0}
        dateSelectorPresets={dateSelectorPresets}
        expandedRows={expandedRows}
        filterOptions={[]}
        loading={loading}
        push={push}
        onChangeViewMode={this.handleViewModeChange}
        onDetailsClick={this.handleRowDetailsClick}
        onExpandRow={this.handleExpandRow}
        onFilterChange={this.handleFilterChange}
        onFilterClear={this.handleFilterClear}
        onOrderChange={this.handleOrderChange}
        onPageChange={this.handlePageChange}
        onPageCountChange={this.handlePageCountChange}
        onRowClick={this.handleRowClick}
        onSelectRow={this.handleSelectRow}
        pagination={pagination}
        rows={list.rows}
        selectedRows={selectedRows}
        query={query}
        viewMode={viewMode}
        t={t}
      />
    )
  }
}

RecipientsSearch.propTypes = {
  client: PropTypes.shape({
    recipients: PropTypes.shape({
      find: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  onReceiveSearch: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
  onRequestSearchFail: PropTypes.func.isRequired,
  query: PropTypes.shape({
    count: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    search: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(RecipientsSearch)
