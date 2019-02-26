import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Col,
  Grid,
  Row,
  Spacing,
} from 'former-kit'
import ContentLoader from 'react-content-loader'
import TotalDisplay from '../../../components/TotalDisplay'
import withLoader from '../../../components/withLoader'
import formatCurrency from '../../../formatters/currency'

import style from './style.css'

const colors = {
  amount: '#37cc9a',
  cost: '#ff796f',
  requested: '#37cc9a',
}

/* eslint-disable function-paren-newline */
const withSkeleton = withLoader(
  <ContentLoader
    speed={2}
    primaryColor="#d7e4eb"
    secondaryColor="#b7c7cf"
    className={style.overlay}
  >
    <rect x="60%" y={7} rx="2" ry="2" width="35%" height="5" />
    <rect x="45%" y={18} rx="2" ry="2" width="50%" height="8" />

    <rect x="60%" y={36} rx="2" ry="2" width="35%" height="5" />
    <rect x="45%" y={46} rx="2" ry="2" width="50%" height="9" />

    <rect x="65%" y={64} rx="2" ry="2" width="30%" height="3" />
    <rect x="70%" y={68} rx="2" ry="2" width="25%" height="3" />

    <rect x="60%" y={76} rx="2" ry="2" width="35%" height="5" />
    <rect x="45%" y={85} rx="2" ry="2" width="50%" height="9" />
  </ContentLoader>
)
/* eslint-enable */

const Results = ({
  amount,
  approximateRequested,
  cost,
  hasErrors,
  isAutomaticTransfer,
  onCancel,
  onConfirm,
  renderInfo,
  t,
  transferCost,
}) => (
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
        disabled={hasErrors || amount < 0}
        fill="outline"
        onClick={onCancel}
        type="button"
      >
        {t('pages.anticipation.cancel')}
      </Button>
      <Button
        disabled={hasErrors || amount < 0}
        onClick={onConfirm}
        type="button"
      >
        {t('pages.anticipation.continue')}
      </Button>
    </CardActions>
  </Card>
)

Results.propTypes = {
  amount: PropTypes.number.isRequired,
  approximateRequested: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  hasErrors: PropTypes.bool.isRequired,
  isAutomaticTransfer: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  renderInfo: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  transferCost: PropTypes.number.isRequired,
}

export default withSkeleton(Results)
