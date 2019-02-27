import isUrl from 'validator/lib/isURL'

export default message => value => (!value || !isUrl(value)) && message
