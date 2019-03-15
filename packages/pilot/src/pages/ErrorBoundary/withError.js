import React from 'react'
import { ErrorBoundary } from '.'

const withError = Component => props => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
)

export default withError
