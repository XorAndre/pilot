import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
} from 'former-kit'
import { action } from '@storybook/addon-actions'
import ContentLoader from 'react-content-loader'

import Section from '../../Section'
import withLoader from '../../../src/components/withLoader'
import style from './spinner.css'

const actionLoading = action('loading')

/* eslint-disable function-paren-newline */
const withSpinner = withLoader(
  <div className={style.overlay}>
    <span className={style.spinner} />
  </div>
)

const withSkeleton = withLoader(
  <ContentLoader
    speed={2}
    primaryColor="#f9f9f9"
    secondaryColor="#ecebeb"
    className={style.overlay}
    style={{ backgroundColor: '#ffffff' }}
  >
    <rect x={8} y={16} rx="2" ry="2" width="60%" height="20" />
    <rect x={8} y={55} rx="2" ry="2" width="90%" height="10" />
  </ContentLoader>
)
/* eslint-enable */

const CardSample = ({ onClick, text }) => ( // eslint-disable-line
  <Card>
    <CardTitle title={<h2>Here we create a card wrapped by withLoader</h2>} />
    <CardContent>
      The Card content can be anything. The loader will appear when the user
      click on loader action button bellow.
    </CardContent>
    <CardActions>
      <Button onClick={onClick}>
        { text }
      </Button>
    </CardActions>
  </Card>
)

const CardWithSpinner = withSpinner(CardSample)
const CardWithSkeleton = withSkeleton(CardSample)

class CardExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      loadingSkeleton: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClickSkeleton = this.handleClickSkeleton.bind(this)
  }

  handleClick () {
    this.setState({ loading: true })
    actionLoading(true)

    setTimeout(() => {
      this.setState({ loading: false })
      actionLoading(false)
    }, 1000)
  }

  handleClickSkeleton () {
    this.setState({ loadingSkeleton: true })
    actionLoading(this.state.loadingSkeleton)

    setTimeout(() => {
      this.setState({ loadingSkeleton: false })
      actionLoading(this.state.loadingSkeleton)
    }, 2000)
  }

  render () {
    return (
      <Section title="Loader">
        <CardWithSpinner
          loading={this.state.loading}
          onClick={this.handleClick}
          text="load with spinner"
        />
        <br />
        <CardWithSkeleton
          loading={this.state.loadingSkeleton}
          onClick={this.handleClickSkeleton}
          text="load with skeleton"
        />
      </Section>
    )
  }
}

export default CardExample
