const bcrypt = require('bcrypt')

const userRouter = require('express').Router()
const User = require('./user.model.js')




userRouter.get('/', async (request, response) => {
	
	
	const users = await User.find({})
	response.json(users)
	
  })

userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (!username || !name || !password) {
    return response.status(400).json({
      error: 'username, name or password missing'
    })
  }

  	if (password.length < 3)
	{
		return response.status(400).json({
      error: 'Password is too short'
    })
	}


	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	
	const user = new User({
    username,
    name,
    passwordHash,
  })

	const savedUser = await user.save()
	response.status(201).json(savedUser)

  })



module.exports = userRouter