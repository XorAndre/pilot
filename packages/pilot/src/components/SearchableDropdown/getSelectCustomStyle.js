const getSelectCustomStyle = error => ({
  container: base => ({
    ...base,
    fontSize: '14px',
    width: '100%',
  }),
  control: (base, state) => {
    const {
      isDisabled,
      isFocused,
    } = state

    const style = {
      ...base,
      '&:hover': {
        borderColor: '#37cc9a',
        cursor: 'pointer',
      },
      backgroundColor: 'transparent',
      borderColor: '#c2c5c7',
      borderLeft: '0',
      borderRadius: '3px',
      borderRight: '0',
      borderTop: '0',
      borderWidth: '2px',
      boxShadow: 'none',
      minHeight: '32px',
      transition: 'border-color 100ms ease-in-out',
      width: '100%',
    }

    if (isFocused) {
      style.borderColor = '#37cc9a'
    }

    if (error) {
      style['&:hover'].borderColor = '#c2143e'
      style.borderColor = '#c2143e'
    }

    if (isDisabled) {
      style.pointerEvents = 'auto'
      style.color = '#d1d5d8'
      style.borderColor = '#d1d5d8'
      style['&:hover'].borderColor = '#d1d5d8'
      style.cursor = 'not-allowed'
    }

    return style
  },
  dropdownIndicator: base => ({
    ...base,
    ':hover': {
      color: 'inherit',
    },
    color: 'inherit',
  }),
  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),
  input: base => ({
    ...base,
    marginLeft: '1px',
  }),
  option: (base, state) => {
    const { isFocused } = state
    return {
      ...base,
      backgroundColor: (isFocused)
        ? '#c3f0e0'
        : 'transparent',
    }
  },
  singleValue: (base, state) => {
    const { isDisabled } = state
    return {
      ...base,
      color: (isDisabled)
        ? '#d1d5d8'
        : '#757575',
      margin: '0',
    }
  },
  valueContainer: base => ({
    ...base,
    padding: '0',
    paddingBottom: '2px',
    paddingLeft: '3px',
    paddingTop: '6px',
  }),
})

export default getSelectCustomStyle
