import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'former-kit'
import { range } from 'ramda'
import styles from '../style.css'

const renderPartners = (identification, t) => {
  const amountOfPartners = parseInt(identification.partnerNumber, 10)
  const partnersNumberRange = range(0, amountOfPartners)
  const cpfLabel = t('pages.add_recipient.cpf')

  const nameLabel = (identification.documentType === 'cpf')
    ? t('pages.add_recipient.name')
    : t('pages.add_recipient.company_name')

  const emailLabel = t('pages.add_recipient.email')

  const partnersRows = partnersNumberRange.map((partnerNumber) => {
    const key = `partner${partnerNumber}`
    const partner = identification[key]

    return (
      <Row key={key}>
        <Col>
          <span className={styles.infoTitle}>{cpfLabel}</span>
          <span className={styles.info}>{partner.cpf}</span>
        </Col>
        <Col>
          <span className={styles.infoTitle}>{nameLabel}</span>
          <span className={styles.info}>{partner.name}</span>
        </Col>
        <Col>
          <span className={styles.infoTitle}>{emailLabel}</span>
          <span className={styles.info}>{partner.email}</span>
        </Col>
      </Row>
    )
  })

  const partners = (partnersRows.length > 0)
    ? partnersRows
    : (
      <Row>
        <Col>
          <h3 className={styles.subtitle}>{t('pages.add_recipient.no_partner')}</h3>
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
    partner0: partnerPropTypes,
    partner1: partnerPropTypes,
    partner2: partnerPropTypes,
    partner3: partnerPropTypes,
    partner4: partnerPropTypes,
    partnerNumber: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,

}

PartnerInfo.defaultProps = {
  identification: {
    partner0: partnerDefaultTypes,
    partner1: partnerDefaultTypes,
    partner2: partnerDefaultTypes,
    partner3: partnerDefaultTypes,
    partner4: partnerDefaultTypes,
    partnerNumber: '',
  },
}

export default PartnerInfo

