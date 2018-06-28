import React from 'react'
import PropTypes from 'prop-types'

import IconInfo from 'emblematic-icons/svg/Info32.svg'
import Search32 from 'emblematic-icons/svg/Search32.svg'

import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Col,
  Grid,
  Input,
  Pagination,
  Row,
  Table,
} from 'former-kit'

import style from './style.css'
import Filter from '../Filter'
import tableColumns from './tableColumns'

const RecipientsList = ({
  expandedRows,
  filterOptions,
  loading,
  onDetailsClick,
  onExpandRow,
  onFilterChange,
  onFilterClear,
  onOrderChange,
  onPageChange,
  onRowClick,
  onSelectRow,
  pagination,
  query,
  rows,
  selectedRows,
  t,
}) => {
  const columns = tableColumns({ t, onDetailsClick })
  const handleOrderChange = columnIndex =>
    onOrderChange(columns[columnIndex].accessor)
  return (
    <Grid>
      <Row>
        <Col
          palm={12}
          tablet={12}
          desk={12}
          tv={12}
        >
          <Filter
            disabled={loading}
            onChange={onFilterChange}
            onClear={onFilterClear}
            options={filterOptions}
            query={query}
            t={t}
          >
            <Input
              icon={<Search32 width={16} height={16} />}
              name="search"
              placeholder={t('pages.recipients.text_search_placeholder')}
            />
          </Filter>
        </Col>
        <Col
          palm={12}
          tablet={12}
          desk={12}
          tv={12}
        >
          {rows.length <= 0 && !loading &&
            <Alert
              icon={<IconInfo height={16} width={16} />}
              type="info"
            >
              <p>
                <strong>{t('pages.recipients.no_results')}</strong>&nbsp;
                {t('pages.recipients.try_again')}
              </p>
            </Alert>
          }
          {rows.length > 0 &&
            <Card>
              <CardTitle
                title={
                  <h2 className={style.customTitle}>
                    {t('pages.recipients.title')}
                  </h2>
                }
                subtitle={
                  <div>
                    <Pagination
                      currentPage={pagination.offset}
                      totalPages={pagination.total}
                      onPageChange={onPageChange}
                      disabled={loading}
                      strings={{
                        of: t('components.pagination.of'),
                      }}
                    />
                  </div>
                }
              />
              <CardContent>
                <Table
                  columns={columns}
                  disabled={loading}
                  expandable
                  expandedRows={expandedRows}
                  maxColumns={6}
                  onExpandRow={onExpandRow}
                  onOrderChange={handleOrderChange}
                  onRowClick={onRowClick}
                  onSelectRow={onSelectRow}
                  rows={rows}
                  selectedRows={selectedRows}
                />
              </CardContent>
              <CardActions>
                <Pagination
                  currentPage={pagination.offset}
                  disabled={loading}
                  onPageChange={onPageChange}
                  strings={{
                    of: t('components.pagination.of'),
                  }}
                  totalPages={pagination.total}
                />
              </CardActions>
            </Card>
          }
        </Col>
      </Row>
    </Grid>
  )
}

RecipientsList.propTypes = {
  query: PropTypes.shape({
    search: PropTypes.string,
  }),
  expandedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  onExpandRow: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    offset: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    anticipatable_volume_percentage: PropTypes.number,
    automatic_anticipation_days: PropTypes.string,
    automatic_anticipation_enabled: PropTypes.bool,
    automatic_anticipation_type: PropTypes.string,
    bank_account: PropTypes.shape({
      document_number: PropTypes.string,
      id: PropTypes.number,
      legal_name: PropTypes.string,
    }),
    date_created: PropTypes.string,
    date_updated: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    transfer_day: PropTypes.number,
    transfer_enabled: PropTypes.bool,
    transfer_interval: PropTypes.string,
  })).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  t: PropTypes.func.isRequired,
}

RecipientsList.defaultProps = {
  query: {
    search: '',
  },
}

export default RecipientsList
