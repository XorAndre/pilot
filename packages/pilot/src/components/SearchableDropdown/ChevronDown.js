import React from 'react'
import { components as SelectComponents } from 'react-select'
import IconChevronDown from 'emblematic-icons/svg/ChevronDown24.svg'

const { DropdownIndicator } = SelectComponents

const ChevronDown = props => (
  <DropdownIndicator {...props}>
    <IconChevronDown width={12} height={12} />
  </DropdownIndicator>
)

export default ChevronDown
