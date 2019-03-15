import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { receiveReactError } from '.'

const mapStateToProps = ({ error }) => ({ error })

const mapDispatchToProps = dispatch => ({
  receiveError: (params) => {
    dispatch(receiveReactError(params))
  },
})

const enhanced = connect(
  mapStateToProps,
  mapDispatchToProps
)

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      hasError: false,
    }
  }

  componentDidCatch (error, info) {
    debugger // eslint-disable-line
    this.props.receiveError(error, info)
  }

  // static getDerivedStateFromError (error) {
  //   debugger // eslint-disable-line
  //   this.props.receiveError(error)
  //   return null
  // }

  static getDerivedStateFromProps (props, state) {
    if (props.error) {
      return {
        ...state,
        error: props.error,
        hasError: true,
      }
    }

    return null
  }
  /* eslint-disable */
  render () {
    const { children } = this.props
    const { error, hasError } = this.state
    const batata = { name: 'batata', message: 'wololo' }

    if (hasError) {
      debugger // eslint-disable-line
      return <div>{error}</div>
    }

    return <div>{batata}</div>
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.shape({}), // eslint-disable-line react/no-unused-prop-types
  receiveError: PropTypes.func.isRequired,
}

ErrorBoundary.defaultProps = {
  error: null,
}

export default enhanced(ErrorBoundary)
