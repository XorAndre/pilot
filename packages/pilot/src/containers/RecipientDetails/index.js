import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  Legend,
  TabBar,
  TabItem,
} from 'former-kit'
import { omit } from 'ramda'
import Information from './Info'
import Configuration from './Config'
import Balance from './Balance'

import styles from './styles.css'

class RecipientDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (selected) {
    this.setState({
      selected,
    })
  }

  render () {
    const {
      recipient,
      balanceProps,
      informationProps,
      configurationProps,
      t,
    } = this.props
    return (
      <CardContent>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.bankAccount}>
              <span className={styles.label}>{t('conta_bancaria')}</span>
              <h2 className={styles.companyName}>{recipient.name}</h2>
              <span className={styles.labelBottom}>{`${t('ID: ')}#${recipient.id}`}</span>
            </div>
            <div className={styles.status}>
              <span className={styles.label}>{t('status')}</span>
              <div className={styles.statusLegend}>
                <Legend
                  color="#17c9b2"
                  acronym={recipient.status}
                  hideLabel
                >
                  {t('ativo')}
                </Legend>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <span className={styles.label}>{t('id_do_recebedor')}</span>
            <span className={styles.hash}>{recipient.hash}</span>
            <span className={styles.labelBottom}>{`${t('data_de_criacao')}: ${recipient.createDate}`}</span>
          </div>
        </div>
        <TabBar
          selected={this.state.selected}
          onTabChange={this.handleChange}
        >
          <TabItem text={t('extrato')}>
            <Balance
              {...balanceProps}
              t={t}
            />
          </TabItem>
          <TabItem text={t('configuracoes')}>
            <Configuration
              {...configurationProps}
              t={t}
            />
          </TabItem>
          <TabItem text={t('mais_informacoes')}>
            <Information
              {...informationProps}
              t={t}
            />
          </TabItem>
        </TabBar>
      </CardContent>
    )
  }
}

const infoProps = omit(['t'], Information.propTypes)
const configProps = omit(['t'], Configuration.propTypes)
const balanceProps = omit(['t'], Balance.propTypes)

RecipientDetails.propTypes = {
  recipient: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    createDate: PropTypes.string,
    hash: PropTypes.string,
  }).isRequired,
  informationProps: PropTypes.shape(
    infoProps
  ).isRequired,
  configurationProps: PropTypes.shape(
    configProps
  ).isRequired,
  balanceProps: PropTypes.shape(
    balanceProps
  ).isRequired,
  t: PropTypes.func.isRequired,
}

export default RecipientDetails
