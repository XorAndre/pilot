import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import { Card, CardContent, CardActions, Button } from 'former-kit'
import Form from 'react-vanilla-form'
import Section from '../../Section'
import SearchableDropdown from '../../../src/components/SearchableDropdown'
import translations from '../../../public/locales/pt/translations.json'

const bankCodes = translations.models.bank_code

const options = Object.entries(bankCodes)
  .map(([key, value]) => ({
    name: value,
    value: key,
  }))
  .sort((a, b) =>
    parseInt(a.value, 10) - parseInt(b.value, 10))

const mustChooseBank = value => value === '000' && 'Você precisa escolher um banco!'

class SearchableDropdownExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bank: '001',
      error: '',
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (value, error) {
    this.setState({
      bank: value.bank,
      error: error.bank,
    })
  }

  render () {
    const { bank, error } = this.state

    return (
      <Section title="Searchable Dropdown">
        <Card>
          <Form
            data={{
              bank,
            }}
            errors={{
              bank: error,
            }}
            validateOn="blur"
            validation={{
              bank: [mustChooseBank],
            }}
            onChange={this.onChange}
            onSubmit={action('onSubmit')}
          >
            <CardContent>
              <SearchableDropdown
                label="Selecione seu banco"
                name="bank"
                noOptionsMessage="Nenhum item foi encontrado"
                onChange={action('change')}
                options={options}
                placeholder="Digite para pesquisar"
              />
            </CardContent>
            <CardActions>
              <Button type="submit">Submit</Button>
            </CardActions>
          </Form>
        </Card>
      </Section>
    )
  }
}

export default SearchableDropdownExample
