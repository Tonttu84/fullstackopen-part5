const result = require('dotenv').config()

console.log(process.env.NODE_ENV)

if (result.error) {
  console.log('⚠️ .env file not found or failed to load')
  console.log(process.env.NODE_ENV)
} else {
  console.log('✅ .env loaded')
  console.log(process.env.NODE_ENV)
}

const SECRET = process.env.NODE_ENV === 'test'
  ? 'testsecret'
  : process.env.SECRET

const PORT = process.env.PORT || 3001
const mongoUrl = process.env.MONGODB_URI

module.exports = { PORT, mongoUrl, SECRET }