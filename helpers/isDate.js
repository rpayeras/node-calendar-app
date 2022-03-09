const { DateTime } = require('luxon')

const isDate = (value, { req, location, path }) => {
  if (!value) {
    return false
  }

  return DateTime.fromISO(value).isValid
}

module.exports = {
  isDate
}
