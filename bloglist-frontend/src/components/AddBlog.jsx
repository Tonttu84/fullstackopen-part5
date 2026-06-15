import { useState } from 'react'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import { Button, BoxInput, HiddenLabel } from '../styles/components'



const AddBlog = ({ createBlog, notifMessage }) =>  {

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
	
		await createBlog({
		  title,
		  author,
		  url
		})
	
		setTitle('')
		setAuthor('')
		setUrl('')
		navigate('/')
	  }
  

	
	return (
	  <div>

		<p></p>

		<h2>create new</h2>

		<Notification notification={notifMessage} />
  
		<form onSubmit={handleSubmit}>
		  <div>
		  <HiddenLabel htmlFor="title">title</HiddenLabel>
				
				<BoxInput
				id = 'title'
				type="text"
				placeholder = 'title'
				value={title}
				onChange={({ target }) => setTitle(target.value)}
				/>
			
		  </div>
		  
		  <div>
		  <HiddenLabel htmlFor="author">author</HiddenLabel>
				
				<BoxInput
				id = 'author'
				type="text"
				placeholder = 'author'
				value={author}
				onChange={({ target }) => setAuthor(target.value)}
				/>
			
		   </div>
  
  		  <div>	
			<HiddenLabel htmlFor="url">url</HiddenLabel>
				
				<BoxInput
				id = 'url'
				type="text"
				placeholder = 'url'
				value={url}
				onChange={({ target }) => setUrl(target.value)}
				/>
			
		  </div>
  
		  <Button type="submit">create</Button>
		</form>
		
	  </div>
	  
	)
	
	
	
	
}

export default AddBlog