import React from 'react'
import PropTypes from 'prop-types'
import { propOr, __ } from 'ramda'

import {
  Button,
  Flexbox,
  Popover,
  PopoverContent,
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarLinks,
} from 'former-kit'

import IconMenu from 'emblematic-icons/svg/Menu32.svg'
import IconWallet from 'emblematic-icons/svg/Wallet32.svg'

import style from './style.css'

import SidebarSections from '../../components/SidebarSections'
import SidebarSummary from '../../components/SidebarSummary'
import formatDecimalCurrency from '../../formatters/decimalCurrency'
import environment from '../../environment'

class SidebarContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      summaryCollapsed: true,
    }

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  handleToggleSidebar () {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  renderSections () {
    const {
      anticipationLimit,
      balance,
      onAnticipate,
      onWithdraw,
      t,
      transfersPricing,
    } = this.props

    const getFrombalance = propOr(null, __, balance)
    const available = getFrombalance('available')
    const waitingFunds = getFrombalance('waitingFunds')
    const apiMinValue = 100

    return (
      <SidebarSections
        sections={[
          {
            action: onWithdraw,
            actionTitle: t('pages.sidebar.withdraw'),
            disabled: available <= transfersPricing.ted + apiMinValue,
            title: t('pages.sidebar.available'),
            value: <span><small>{t('pages.sidebar.currency_symbol')}</small> {formatDecimalCurrency(available)}</span>,
          },
          {
            action: onAnticipate,
            actionTitle: t('pages.sidebar.anticipation'),
            disabled: anticipationLimit < apiMinValue,
            title: t('pages.sidebar.waiting_funds'),
            value: <span><small>{t('pages.sidebar.currency_symbol')}</small> {formatDecimalCurrency(waitingFunds)}</span>,
          },
        ]}
      />
    )
  }

  render () {
    const {
      collapsed,
      summaryCollapsed,
    } = this.state
    const {
      companyName,
      links,
      logo: Logo,
      onLinkClick,
      sessionId,
      t,
    } = this.props

    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed && <Logo width="140" />}

          <Button
            onClick={this.handleToggleSidebar}
            icon={<IconMenu width={16} height={16} />}
            fill="clean"
            relevance="low"
          />
        </SidebarHeader>

        {!collapsed &&
          <SidebarSummary
            collapsed={summaryCollapsed}
            onClick={() => this.setState({
              summaryCollapsed: !summaryCollapsed,
            })}
            subtitle={
              summaryCollapsed
                ? t('pages.sidebar.show_balance')
                : t('pages.sidebar.hide_balance')
            }
            title={companyName}
          >
            {this.renderSections()}
          </SidebarSummary>
        }

        {collapsed &&
          <Popover
            base="dark"
            content={
              <PopoverContent>
                {this.renderSections()}
              </PopoverContent>
            }
            placement="rightStart"
          >
            <SidebarLinks>
              <SidebarLink
                collapsed={collapsed}
                onClick={() => null}
                icon={<IconWallet width={16} height={16} />}
                title={t('pages.sidebar.balance')}
              />
            </SidebarLinks>
          </Popover>
        }

        <SidebarLinks>
          {links.map(({
            active,
            exact,
            icon: Icon,
            path,
            title,
          }) => (
            <SidebarLink
              key={path}
              title={t(title)}
              active={active}
              icon={<Icon width={16} height={16} />}
              collapsed={collapsed}
              onClick={() => onLinkClick({ active, exact, path })}
            />
          ))}
        </SidebarLinks>
        {!collapsed &&
          <Flexbox
            className={style.backToOldVersion}
            justifyContent="center"
          >
            <Button
              onClick={
                // eslint-disable-next-line no-undef
                () => window.open(`https://dashboard.pagar.me/#login?session_id=${sessionId}&redirect_to=dashboard.home&environment=${environment}`)
              }
              fill="outline"
              size="tiny"
            >
              {t('pages.sidebar.back_to_old_version')}
            </Button>
          </Flexbox>
        }
      </Sidebar>
    )
  }
}

SidebarContainer.propTypes = {
  anticipationLimit: PropTypes.number,
  balance: PropTypes.shape({
    available: PropTypes.number,
    waitingFunds: PropTypes.number,
  }).isRequired,
  companyName: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    component: PropTypes.func,
    icon: PropTypes.func,
    path: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  logo: PropTypes.func.isRequired,
  onAnticipate: PropTypes.func,
  onLinkClick: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func,
  sessionId: PropTypes.string,
  t: PropTypes.func.isRequired,
  transfersPricing: PropTypes.shape({
    ted: PropTypes.number,
  }),
}

SidebarContainer.defaultProps = {
  anticipationLimit: null,
  companyName: '',
  onAnticipate: null,
  onWithdraw: null,
  sessionId: '',
  transfersPricing: {},
}

export default SidebarContainer
