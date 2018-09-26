const between = (start, end, message) => (value) => {
  const number = parseInt(value, 10)
  return (number < start || number > end) && message
}

export default between
