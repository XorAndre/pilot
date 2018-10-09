import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../../Section'
import ErrorStep from '../../../../src/containers/AddRecipient/ErrorStep'

import {
  AUTHENTICATION_ERROR,
  FORM_SUBMIT_ERROR,
  PERMISSION_ERROR,
  SERVER_ERROR,
} from '../../../../src/formatters/errorType'

const props = {
  onExit: action('onExit'),
  onLoginAgain: action('onLoginAgain'),
  onTryAgain: action('onTryAgain'),
  onViewDetails: action('onViewDetails'),
  t: t => t,
}

export const ErrorStepDefault = () => (
  <Section>
    <ErrorStep {...props} />
  </Section>
)
export const ErrorStepSubmit = () => (
  <Section>
    <ErrorStep {...props} error={FORM_SUBMIT_ERROR} />
  </Section>
)

export const ErrorStepLogin = () => (
  <Section>
    <ErrorStep {...props} error={AUTHENTICATION_ERROR} />
  </Section>
)

export const ErrorStepPermission = () => (
  <Section>
    <ErrorStep {...props} error={PERMISSION_ERROR} />
  </Section>
)

export const ErrorStepServer = () => (
  <Section>
    <ErrorStep {...props} error={SERVER_ERROR} />
  </Section>
)
