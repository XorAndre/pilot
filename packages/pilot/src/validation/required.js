import {
  either,
  isEmpty,
  isNil,
} from 'ramda'

const isNilOrEmpty = either(isEmpty, isNil)

export default message => value => isNilOrEmpty(value) && message
