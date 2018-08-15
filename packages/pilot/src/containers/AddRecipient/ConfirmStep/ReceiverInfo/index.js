import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Row,
} from 'former-kit'

import styles from '../style.css'

const renderReceiverNameEmailInfo = (identification, t) => {
  const name = t(`pages.recipients.identification.${identification.documentType}_name`)
  const email = t(`pages.recipients.identification.${identification.documentType}_email`)
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
  const url = t(`pages.recipients.identification.${identification.documentType}_url`)
  const phone = t(`pages.recipients.identification.${identification.documentType}_phone`)
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
        {t(`pages.recipients.identification.${identification.documentType}_check_label`)}
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
