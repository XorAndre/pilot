import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import { curry } from 'ramda'
import { Transition, fade } from 'former-kit'

import style from './style.css'

const withRouter = curry((Renderer, Component) => {
  class Loader extends React.Component {
    constructor (props) {
      super(props)

      this.id = shortid.generate()
    }

    render () {
      const { loading } = this.props

      return (
        <div className={style.container}>
          <Transition
            atActive={fade.atActive}
            atEnter={fade.atEnter}
            atLeave={fade.atLeave}
            mapStyles={fade.mapStyles}
            springOptions={fade.springOptions}
          >
            {loading &&
              React.cloneElement(
                Renderer,
                {
                  key: Renderer.props.id || this.id,
                }
              )
            }
          </Transition>
          <Component {...this.props} />
        </div>
      )
    }
  }

  Loader.propTypes = {
    loading: PropTypes.bool,
  }

  Loader.defaultProps = {
    loading: false,
  }

  return Loader
})

export default withRouter
