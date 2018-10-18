import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import ChevronDown from './ChevronDown'
import getSelectCustomStyle from './getSelectCustomStyle'
import style from './style.css'

const toSelectOption = option => ({
  name: option.value,
  label: option.name,
})

class SearchableDropdown extends Component {
  constructor (props) {
    super(props)
    const options = props.options.map(toSelectOption)
    const selectedOption = options.find(option => option.name === props.value)

    this.state = {
      selectedOption,
      menuIsOpen: false,
      options,
    }

    this.getNoOptionsMessage = this.getNoOptionsMessage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onMenuClose = this.onMenuClose.bind(this)
    this.onMenuOpen = this.onMenuOpen.bind(this)
  }

  onMenuClose () {
    this.setState({ menuIsOpen: false })
  }

  onMenuOpen () {
    this.setState({ menuIsOpen: true })
  }

  // NOTE: react-select does not send the original onChange event
  onChange (selectedOption) {
    if (this.state.selectedOption === selectedOption) return
    this.setState({ selectedOption })
    const { onChange } = this.props
    if (onChange) onChange(selectedOption.name)
  }

  getNoOptionsMessage () {
    return this.props.noOptionsMessage
  }

  render () {
    const {
      menuIsOpen,
      options,
      selectedOption,
    } = this.state

    const {
      disabled,
      error,
      label,
      ...props
    } = this.props

    const value = (menuIsOpen)
      ? null
      : selectedOption

    const customStyle = getSelectCustomStyle(error)

    return (
      <Fragment>
        { label &&
          <span className={style.label}>{label}</span>
        }
        <Select
          {...props}
          className="react-select-container"
          classNamePrefix="react-select"
          components={{ DropdownIndicator: ChevronDown }}
          isDisabled={disabled}
          isSearchable
          noOptionsMessage={this.getNoOptionsMessage}
          onChange={this.onChange}
          onMenuClose={this.onMenuClose}
          onMenuOpen={this.onMenuOpen}
          options={options}
          styles={customStyle}
          value={value}
        />
        { error &&
          <p className={style.error}>{error}</p>
        }
      </Fragment>
    )
  }
}

SearchableDropdown.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  placeholder: PropTypes.string,
  value: PropTypes.string,
}

SearchableDropdown.defaultProps = {
  disabled: false,
  error: '',
  label: '',
  noOptionsMessage: '',
  onBlur: null,
  onChange: null,
  onFocus: null,
  options: [],
  placeholder: '',
  value: '',
}

export default SearchableDropdown
