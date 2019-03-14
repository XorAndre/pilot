import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  compose,
  equals,
  isNil,
  find,
  propEq,
  propSatisfies,
  uncurryN,
  unless,
} from 'ramda'
import { withRouter } from 'react-router-dom'
import { receiveReactError } from '.'

const mapStateToProps = ({ errors }) => ({ errors })

const mapDispatchToProps = dispatch => ({
  receiveError: (error, stack) => {
    dispatch(receiveReactError({ error, stack }))
  },
})

const enhanced = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const isInRoutes = route => unless(
  isNil,
  find(equals(route))
)

const findInErrorsRoutes = uncurryN(2, route => find(propSatisfies(
  isInRoutes(route),
  'affectedRoutes'
)))

class ErrorBoundary extends Component {
  constructor () {
    super()

    this.cloneChild = this.cloneChild.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidCatch (error) {
    this.props.receiveError(error)
  }

  handleError (error, affectedRoutes = []) {
    const { location: { pathname } } = this.props

    this.props.receiveError({
      affectedRoutes: [...affectedRoutes, pathname],
      error,
    })
  }

  cloneChild (child) {
    const {
      errors,
      location: { pathname },
    } = this.props

    const filteredError = findInErrorsRoutes(pathname, errors)

    return React.cloneElement(
      child,
      {
        error: filteredError,
        throwError: this.handleError,
      }
    )
  }

  render () {
    const {
      children,
      errors,
    } = this.props
    const globalError = find(propEq('global', true), errors)

    if (globalError) {
      return globalError.getErrorComponent()
    }

    return React.Children.map(children, this.cloneChild)
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  receiveError: PropTypes.func.isRequired,
}

ErrorBoundary.defaultProps = {
  errors: null,
}

export default enhanced(ErrorBoundary)
