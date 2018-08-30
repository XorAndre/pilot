import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../../Section'
import ErrorStep from '../../../../src/containers/AddRecipient/ErrorStep'

const ErrorStepExample = () => (
  <Section>
    <ErrorStep
      status="error"
      onExit={action('onExit')}
      onTryAgain={action('onTryAgain')}
      onViewDetails={action('onViewDetails')}
      t={t => t}
    />
  </Section>
)

export default ErrorStepExample
