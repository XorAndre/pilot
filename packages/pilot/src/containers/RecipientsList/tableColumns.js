import React from 'react'
import {
  pipe,
  prop,
} from 'ramda'

import {
  Col,
  Row,
  Grid,
} from 'former-kit'

import formatDate from '../../formatters/longDate'
import StatusLegend from '../../containers/RecipientsList/statusLegend'
import style from './style.css'

const columnData = data => (
  data.map(item => (
    <Col
      key={item.title}
      palm={12}
      tablet={12}
      desk={12}
      tv={12}
    >
      <span>{item.title}: <strong>{item.content}</strong></span>
    </Col>
  ))
)

const getDefaultColumns = ({ t }) => ([
  {
    title: t('pages.recipients.status'),
    renderer: item => (
      <StatusLegend
        item={item}
        t={t}
      />
    ),
    accessor: ['status'],
    orderable: false,
  },
  {
    title: t('pages.recipients.id'),
    accessor: ['id'],
    orderable: false,
  },
  {
    title: t('pages.recipients.bank_account_id'),
    accessor: ['bank_account', 'id'],
    orderable: false,
  },
  {
    title: t('pages.recipients.bank_account_legal_name'),
    accessor: ['bank_account', 'legal_name'],
    orderable: false,
  },
  {
    title: t('pages.recipients.bank_account_document_number'),
    accessor: ['bank_account', 'document_number'],
    orderable: false,
  },
  {
    title: t('pages.recipients.date_created'),
    accessor: ['created_at'],
    orderable: false,
    renderer: pipe(prop('created_at'), formatDate),
  },
  {
    title: '',
    accessor: ['updated_at'],
    isAction: false,
    renderer: data => (
      <Grid>
        <Col
          palm={6}
          tablet={6}
          desk={6}
          tv={6}
          className={style.marginBottom}
        >
          <Row>
            {columnData([
              {
                title: t('pages.recipients.date_updated'),
                content: formatDate(data.date_updated),
              }, {
                title: t('pages.recipients.automatic_anticipation_enabled'),
                content: t(`pages.recipients.automatic_anticipation_enabled_boolean.${data.automatic_anticipation_enabled}`),
              }, {
                title: t('pages.recipients.anticipatable_volume_percentage'),
                content: `${data.anticipatable_volume_percentage}%`,
              },
            ])}
          </Row>
        </Col>
        <Col
          palm={6}
          tablet={6}
          desk={6}
          tv={6}
        >
          <Row>
            {columnData([
              {
                title: t('pages.recipients.transfer_enabled'),
                content: t(`pages.recipients.transfer_enabled_boolean.${data.transfer_enabled}`),
              }, {
                title: t('pages.recipients.transfer_interval'),
                content: t(`pages.recipients.transfer_interval_of.${data.transfer_interval}`),
              }, {
                title: t('pages.recipients.transfer_day'),
                content: data.transfer_day,
              },
            ])}
          </Row>
        </Col>
      </Grid>
    ),
  },
])

export default getDefaultColumns
