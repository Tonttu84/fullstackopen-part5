const isTest = process.env.NODE_ENV === 'test'
const isDebug = process.env.DEBUG === 'true'

const shouldLog = !isTest || isDebug

const info = (...args) => {
  if (shouldLog) console.log(...args)
}

const error = (...args) => {
  if (shouldLog) console.error(...args)
}
module.exports = { info, error }