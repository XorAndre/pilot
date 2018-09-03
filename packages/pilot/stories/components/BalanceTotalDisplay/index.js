import React from 'react'
import { Card, Grid, Row, Col } from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import BalanceTotalDisplay from '../../../src/components/BalanceTotalDisplay'

const BalanceTotalDisplayExample = () => (
  <Section>
    <Grid>
      <Row>
        <Col palm={12} tablet={6} desk={4} tv={4}>
          <Card>
            <BalanceTotalDisplay
              title="Saldo Atual"
              amount="R$ 15.000,00"
              detail={(
                <span>Liberado para saque: <strong>R$5.000,00</strong></span>
              )}
              action={{
                onClick: action('clicked'),
                title: 'Sacar',
              }}
            />
          </Card>
        </Col>

        <Col palm={12} tablet={6} desk={4} tv={4}>
          <Card>
            <BalanceTotalDisplay
              title="A Receber"
              amount="R$ 7.000,00"
              detail={(
                <span>Liberado para saque: <strong>R$5.000,00</strong></span>
              )}
              action={{
                onClick: action('clicked'),
                title: 'Antecipar',
              }}
            />
          </Card>
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default BalanceTotalDisplayExample
