import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
} from 'former-kit'
import { action } from '@storybook/addon-actions'
import Section from '../../Section'
import withLoader from '../../../src/components/withLoader'
import style from './spinner.css'

const actionLoading = action('loading')

const withSpinner = withLoader(
  <div className={style.overlay}>
    <span className={style.spinner} />
  </div>
)

const CardWithLoader = withSpinner(({ onClick }) => (
  <Card>
    <CardTitle title={<h2>Here we create a card wrapped by withLoader</h2>} />
    <CardContent>
      The Card content can be anything. The loader will appear when the user
      click on 'loader' action button bellow.
    </CardContent>
    <CardActions>
      <Button onClick={onClick}>
        load
      </Button>
    </CardActions>
  </Card>
))

class CardExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      loading: true,
    }, () => {
      actionLoading(this.state.loading)
      setTimeout(() => this.setState({
        loading: false,
      }, () => actionLoading(this.state.loading)),
      1000)
    })
  }

  render () {
    return (
      <Section title="Loader">
        <CardWithLoader
          loading={this.state.loading}
          onClick={this.handleClick}
        />
      </Section>
    )
  }
}

export default CardExample
