import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import { Button, Input, HiddenLabel } from '../styles/components'


const Login = ({setUser}) =>
{
	const Navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [errorMessage, setErrorMessage] = useState(null)

	const handleLogin = async (event) => {
		event.preventDefault()
	   try {
		const response = await loginService.login({username, password})
		
	
		setUser(response) 
		localStorage.setItem('loggedBlogUser', JSON.stringify(response));
		blogService.setToken(response.token)
		Navigate('/')
	  } catch (error) {
		console.error('login failed', error)
	
		setErrorMessage({
	  type: 'error',
	  message: 'Invalid username or password'
	})
		setTimeout(() => setErrorMessage(null), 5000)
		setUser(null)
	  }
		
	  }

	return(
	<>
	<h2>Log in to application</h2>
	<Notification notification={errorMessage} />
	<form onSubmit={handleLogin}>
          <div>
		  <HiddenLabel  htmlFor="username">username</HiddenLabel >
              
              <Input
			  id = 'username'
              type = 'text'
				placeholder="username"
              value={username}
              onChange={({target}) => setUsername(target.value)}
              />
           
            </div>
            <div>
			<HiddenLabel  htmlFor="password">password</HiddenLabel >
                
                <Input
				id = 'password'
                type = "password"
				placeholder="password"
                value = {password}
                onChange={({target}) => setPassword(target.value)}
                />
              
            </div>
            <Button type="submit">login</Button>
          </form>
	
	</>
	)
}
export default Login