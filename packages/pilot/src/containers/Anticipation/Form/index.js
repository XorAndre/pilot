import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { always } from 'ramda'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Col,
  Row,
  Grid,
  Spacing,
  Tooltip,
  isMomentPropValidation,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

import TotalDisplay from '../../../components/TotalDisplay'
import Form from './Form'
import formatCurrency from '../../../formatters/currency'
import style from './style.css'

const renderInfo = (text, placement) => (
  <Tooltip
    placement={placement || 'rightMiddle'}
    content={text}
  >
    <IconInfo height={16} width={16} />
  </Tooltip>
)

const colors = {
  amount: '#37cc9a',
  cost: '#ff796f',
  requested: '#37cc9a',
}

class AnticipationFormContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasErrors: false,
    }

    this.handleCalculateSubmit = this.handleCalculateSubmit.bind(this)
  }

  handleCalculateSubmit ({
    dates,
    requested,
    transfer,
    ...values
  }, errors) {
    const { error } = this.props
    if (!errors && !error) {
      const isAutomaticTransfer = transfer === 'yes'

      this.props.onCalculateSubmit({
        date: dates.start,
        isAutomaticTransfer,
        requested: Number(requested),
        ...values,
      })
      this.setState({ hasErrors: false })
    } else {
      this.setState({ hasErrors: true })
    }
  }

  render () {
    const {
      amount,
      approximateRequested,
      cost,
      date,
      error,
      isAutomaticTransfer,
      isValidDay,
      loading,
      maximum,
      minimum,
      onCancel,
      onChange,
      onConfirm,
      requested,
      t,
      timeframe,
      transferCost,
    } = this.props
    const {
      hasErrors,
    } = this.state

    return (
      <Fragment>
        <Row stretch>
          <Col
            desk={8}
            palm={12}
            tablet={12}
            tv={8}
          >
            <Card>
              <Form
                anticipationInfo={renderInfo(t('pages.anticipation.date.advise'))}
                dates={{
                  end: date,
                  start: date,
                }}
                error={error}
                isAutomaticTransfer={isAutomaticTransfer}
                isValidDay={isValidDay}
                loading={loading}
                maximum={maximum}
                minimum={minimum}
                onChange={onChange}
                onSubmit={this.handleCalculateSubmit}
                periodInfo={renderInfo(t('pages.anticipation.period.advise'))}
                requested={requested}
                t={t}
                timeframe={timeframe}
                transferInfo={renderInfo(t('pages.anticipation.transfer.advise'))}
              />
            </Card>
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={12}
            tv={4}
          >
            <Card className={style.summaryContainer}>
              <CardContent className={style.summary}>
                <Grid>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        align="end"
                        amount={approximateRequested}
                        amountSize="huge"
                        color={colors.requested}
                        title={
                          <div className={style.titleInfo}>
                            {renderInfo(
                              t('pages.anticipation.requested.advise'),
                              'leftMiddle'
                            )}
                            <Spacing size="tiny" />
                            <span>{t('pages.anticipation.requested.title')}</span>
                          </div>
                        }
                        titleColor="#757575"
                        titleSize="small"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        align="end"
                        amount={(cost + transferCost)}
                        amountSize="huge"
                        color={colors.cost}
                        subtitle={
                          <span>
                            <Spacing size="tiny" />
                            <div>
                              {t(
                                'pages.anticipation.cost.anticipation',
                                { cost: formatCurrency(cost) }
                              )}
                            </div>
                            {isAutomaticTransfer &&
                              <div>
                                {t(
                                  'pages.anticipation.cost.transfer',
                                  { cost: formatCurrency(transferCost) }
                                )}
                              </div>
                            }
                          </span>
                        }
                        title={
                          <div className={style.titleInfo}>
                            {renderInfo(
                              t('pages.anticipation.cost.advise'),
                              'leftMiddle'
                            )}
                            <Spacing size="tiny" />
                            <span>{t('pages.anticipation.cost.title')}</span>
                          </div>
                        }
                        titleColor="#757575"
                        titleSize="small"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        align="end"
                        amount={amount}
                        amountSize="huge"
                        color={amount > 0
                          ? colors.amount
                          : colors.cost
                        }
                        title={
                          <div className={style.titleInfo}>
                            {renderInfo(
                              t('pages.anticipation.amount.advise'),
                              'leftMiddle'
                            )}
                            <Spacing size="tiny" />
                            <span>{t('pages.anticipation.amount.title')}</span>
                          </div>
                        }
                        titleColor="#757575"
                        titleSize="small"
                      />
                    </Col>
                  </Row>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  disabled={loading || hasErrors || amount < 0}
                  fill="outline"
                  onClick={onCancel}
                  type="button"
                >
                  {t('pages.anticipation.cancel')}
                </Button>
                <Button
                  disabled={loading || hasErrors || amount < 0}
                  onClick={onConfirm}
                  type="button"
                >
                  {t('pages.anticipation.continue')}
                </Button>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

AnticipationFormContainer.propTypes = {
  amount: PropTypes.number.isRequired,
  approximateRequested: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  date: isMomentPropValidation,
  error: PropTypes.string,
  isAutomaticTransfer: PropTypes.bool,
  isValidDay: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  maximum: PropTypes.number,
  minimum: PropTypes.number,
  onCalculateSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  requested: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  timeframe: PropTypes.oneOf(['end', 'start']),
  transferCost: PropTypes.number.isRequired,
}

AnticipationFormContainer.defaultProps = {
  date: moment(),
  error: '',
  isAutomaticTransfer: true,
  isValidDay: always(true),
  maximum: null,
  minimum: null,
  timeframe: 'start',
}

export default AnticipationFormContainer
