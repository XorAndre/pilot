import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-json-tree'

import {
  CardContent,
  CardSection,
  CardTitle,
} from 'former-kit'

import { pick } from 'ramda'

import PartnerInfo from '../../AddRecipient/ConfirmStep/PartnerInfo'
import ReceiverInfo from '../../AddRecipient/ConfirmStep/ReceiverInfo'

import styles from './style.css'

const RecipientDetailInfo = ({
  identification,
  metadata,
  t,
}) => (
  <Fragment>
    <CardContent>
      <CardSection>
        <CardTitle className={styles.title} title={t('pages.recipient_detail.recipient_information')} />
        <CardContent>
          <ReceiverInfo
            identification={pick([
              'cnpj',
              'cnpjEmail',
              'cnpjInformation',
              'cnpjName',
              'cnpjPhone',
              'cnpjUrl',
              'cpf',
              'cpfEmail',
              'cpfInformation',
              'cpfName',
              'cpfPhone',
              'cpfUrl',
              'documentType',
            ], identification)}
            t={t}
          />
        </CardContent>
      </CardSection>
    </CardContent>
    <CardContent>
      <CardSection>
        <CardTitle className={styles.title} title={t('pages.recipient_detail.partner_information')} />
        <CardContent>
          <PartnerInfo
            identification={pick([
              'partnerNumber',
              'partner0',
              'partner1',
              'partner2',
              'partner3',
              'partner4',
            ], identification)}
            t={t}
          />
        </CardContent>
      </CardSection>
    </CardContent>
    <CardContent>
      <CardSection>
        <CardTitle className={styles.title} title={t('pages.recipient_detail.metadata')} />
        <CardContent>
          <Tree
            data={{
              ...metadata,
            }}
            theme={{
              arrowSign: () => ({ className: styles.arrow }),
              tree: () => ({ className: styles.tree }),
              valueText: () => ({ className: styles.value }),
            }}
            getItemString={() => null}
            hideRoot
          />
        </CardContent>
      </CardSection>
    </CardContent>
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

RecipientDetailInfo.propTypes = {
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
    partner0: partnerPropTypes,
    partner1: partnerPropTypes,
    partner2: partnerPropTypes,
    partner3: partnerPropTypes,
    partner4: partnerPropTypes,
    partnerNumber: PropTypes.string,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  metadata: PropTypes.object,
  t: PropTypes.func.isRequired,
}

RecipientDetailInfo.defaultProps = {
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
    partner0: partnerDefaultTypes,
    partner1: partnerDefaultTypes,
    partner2: partnerDefaultTypes,
    partner3: partnerDefaultTypes,
    partner4: partnerDefaultTypes,
    partnerNumber: '',
  },
  metadata: {},
}

export default RecipientDetailInfo
