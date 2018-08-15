import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Row,
} from 'former-kit'
import { range } from 'ramda'

import styles from '../style.css'

const renderPartners = (identification, t) => {
  const amountOfPartners = parseInt(identification.partnerNumber, 10)
  const partnersNumberRange = range(0, amountOfPartners)
  const cpfLabel = t(`pages.recipients.identification.${identification.documentType}_label_cpf`)
  const name = t(`pages.recipients.identification.${identification.documentType}_name`)
  const phone = t(`pages.recipients.identification.${identification.documentType}_phone`)

  const partnersRows = partnersNumberRange.map(partnerNumber => (
    <Row key={`partner${partnerNumber}`}>
      <Col>
        <span className={styles.infoTitle}>{cpfLabel}</span>
        <span className={styles.info}>{identification[`partner${partnerNumber}`].cpf}</span>
      </Col>
      <Col>
        <span className={styles.infoTitle}>{name}</span>
        <span className={styles.info}>{identification[`partner${partnerNumber}`].name}</span>
      </Col>
      <Col>
        <span className={styles.infoTitle}>{phone}</span>
        <span className={styles.info}>{identification[`partner${partnerNumber}`].phone}</span>
      </Col>
    </Row>
  ))
  const partners = (partnersRows.length > 0)
    ? partnersRows
    : (
      <Row>
        <Col>
          <h3 className={styles.subtitle}>{t('no_partner')}</h3>
        </Col>
      </Row>
    )
  return (
    <Fragment>
      {partners}
    </Fragment>
  )
}

const PartnerInfo = ({
  identification,
  t,
}) => (
  <Fragment>
    {renderPartners(identification, t)}
  </Fragment>
)

const partnerPropTypes = PropTypes.shape({
  cpf: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
})

const partnerDefaultTypes = {
  cpf: '',
  name: '',
  phone: '',
}

PartnerInfo.propTypes = {
  identification: PropTypes.shape({
    partnerNumber: PropTypes.string,
    partner0: partnerPropTypes,
    partner1: partnerPropTypes,
    partner2: partnerPropTypes,
    partner3: partnerPropTypes,
    partner4: partnerPropTypes,
  }).isRequired,
  t: PropTypes.func.isRequired,

}

PartnerInfo.defaultProps = {
  identification: {
    partnerNumber: '',
    partner0: partnerDefaultTypes,
    partner1: partnerDefaultTypes,
    partner2: partnerDefaultTypes,
    partner3: partnerDefaultTypes,
    partner4: partnerDefaultTypes,
  },
}

export default PartnerInfo

