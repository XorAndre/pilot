import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Tree from 'react-json-tree'
import {
  CardContent,
  CardSection,
  CardTitle,
} from 'former-kit'
import { pick } from 'ramda'
import PartnerInfo from '../AddRecipient/ConfirmStep/PartnerInfo'
import ReceiverInfo from '../AddRecipient/ConfirmStep/ReceiverInfo'
import styles from './style.css'

const RecipientDetailInfo = ({
  identification,
  bankAccount,
  configuration,
  t,
}) => (
  <Fragment>
    <CardContent>
      <CardSection>
        <CardTitle className={styles.title} title={t('dados_cadastrais_do_recebedor')} />
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
        <CardTitle className={styles.title} title={t('dados_cadastrais_dos_socios')} />
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
        <CardTitle className={styles.title} title={t('metadata')} />
        <CardContent>
          <Tree
            data={{
              identification,
              bankAccount,
              configuration,
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
  bankAccount: PropTypes.shape({
    account_name: PropTypes.string,
    account_number: PropTypes.string,
    account_type: PropTypes.string,
    agency: PropTypes.string,
    bank: PropTypes.string,
  }),
  configuration: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    transferDay: PropTypes.string,
    transferEnabled: PropTypes.bool,
    transferInterval: PropTypes.string,
    transferWeekday: PropTypes.string,
  }),
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
    partnerNumber: '',
    partner0: partnerDefaultTypes,
    partner1: partnerDefaultTypes,
    partner2: partnerDefaultTypes,
    partner3: partnerDefaultTypes,
    partner4: partnerDefaultTypes,
  },
  configuration: {
    anticipationModel: '',
    anticipationVolumePercentage: '',
    anticipationDays: '',
    transferEnabled: false,
    transferInterval: '',
    transferDay: '',
    transferWeekday: '',
  },
  bankAccount: {
    account_name: '',
    account_number: '',
    account_type: '',
    agency: '',
    bank: '',
  },
}

export default RecipientDetailInfo
