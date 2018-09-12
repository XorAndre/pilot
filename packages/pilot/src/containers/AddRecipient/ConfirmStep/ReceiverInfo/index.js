import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Row,
} from 'former-kit'

import styles from '../style.css'

const renderReceiverNameEmailInfo = (identification, t) => {
  const name = (identification.documentType === 'cpf')
    ? t('pages.add_recipient.name')
    : t('pages.add_recipient.company_name')

  const email = t('pages.add_recipient.optional_email')
  if (identification.cnpjInformation || identification.cpfInformation) {
    return (
      <Fragment>
        <Col>
          <span className={styles.infoTitle}>{name}</span>
          <span className={styles.info}>{identification[`${identification.documentType}Name`]}</span>
        </Col>
        <Col>
          <span className={styles.infoTitle}>{email}</span>
          <span className={styles.info}>{identification[`${identification.documentType}Email`]}</span>
        </Col>
      </Fragment>
    )
  }
  return null
}

const renderReceiverUrlPhoneInfo = (identification, t) => {
  const url = t('pages.add_recipient.optional_url')
  const phone = t('pages.add_recipient.optional_phone')
  if (identification.cnpjInformation || identification.cpfInformation) {
    return (
      <Row>
        <Col>
          <span className={styles.infoTitle}>{url}</span>
          <span className={styles.info}>{identification[`${identification.documentType}Url`]}</span>
        </Col>
        <Col>
          <span className={styles.infoTitle}>{phone}</span>
          <span className={styles.info}>{identification[`${identification.documentType}Phone`]}</span>
        </Col>
      </Row>
    )
  }
  return null
}

const ReceiverInfo = ({
  identification,
  t,
}) => (
  <Row>
    <Col>
      <span className={styles.infoTitle}>
        {
          (identification.documentType === 'cpf')
            ? t('pages.add_recipient.more_recipient_information')
            : t('pages.add_recipient.more_company_information')
        }
      </span>
      <span className={styles.info}>
        {identification[identification.documentType]}
      </span>
    </Col>
    {renderReceiverNameEmailInfo(identification, t)}
    {renderReceiverUrlPhoneInfo(identification, t)}
  </Row>
)

ReceiverInfo.propTypes = {
  identification: PropTypes.shape({
    cnpj: PropTypes.string,
    cnpjEmail: PropTypes.string,
    cnpjInformation: PropTypes.bool,
    cnpjName: PropTypes.string,
    cnpjPhone: PropTypes.string,
    cnpjUrl: PropTypes.string,
    cpf: PropTypes.string,
    cpfEmail: PropTypes.string,
    cpfInformation: PropTypes.bool,
    cpfName: PropTypes.string,
    cpfPhone: PropTypes.string,
    cpfUrl: PropTypes.string,
    documentType: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,

}

ReceiverInfo.defaultProps = {
  identification: {
    cnpj: '',
    cnpjEmail: '',
    cnpjInformation: false,
    cnpjName: '',
    cnpjPhone: '',
    cnpjUrl: '',
    cpf: '',
    cpfEmail: '',
    cpfInformation: false,
    cpfName: '',
    cpfPhone: '',
    cpfUrl: '',
    documentType: '',
  },
}

export default ReceiverInfo
