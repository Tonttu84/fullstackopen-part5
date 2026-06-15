const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('./user.model.js')
const config = require('../../utils/config')





  loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	if (!username || !password) {
    return response.status(400).json({
      error: 'username,  or password missing'
    })
  }
  	 const user = await User.findOne({ username }).select('+passwordHash')
	 let passwordCheckPassed = false;

	if (user) 
	{
		passwordCheckPassed = await bcrypt.compare(password, user.passwordHash)
	}

	if (!user || passwordCheckPassed !== true)
	{
		return response.status(401).json({
      	error: 'invalid username or password'
    })
	}

	 const userForToken = {
    username: user.username,
    id: user._id,
  }

  	 const token = jwt.sign(
    userForToken, 
    config.SECRET,
    { expiresIn: 60*60 }
  )

	response
    .status(200)
    .send({ token, username: user.username, name: user.name })


 })

 module.exports = loginRouter