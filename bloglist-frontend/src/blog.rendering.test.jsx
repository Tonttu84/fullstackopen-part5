import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './components/Blog'
import { vi } from 'vitest'



afterEach(() => {
  cleanup()
})







describe('Blog component for unauthenticated users', () => {
	const validBlog = {
	  title: 'Testing with Vitest',
	  author: 'Jane Developer',
	  url: 'https://example.com/testing-vitest',
	  likes: 5,
	  user: '123'
	}
  
	beforeEach(() => {
	  render(<Blog blog={validBlog} />)
	})
  
	test('renders title and author', () => {
	  expect(screen.getByText(/Testing with Vitest/i)).toBeInTheDocument()
	  expect(screen.getByText(/Jane Developer/i)).toBeInTheDocument()
	})
  
	test('renders url and likes', () => {
	  expect(
		screen.getByText(/https:\/\/example.com\/testing-vitest/i )
	  ).toBeInTheDocument()
  
	  expect(screen.getByText(/5 likes/i)).toBeInTheDocument()
	})
  
	test('does not render action buttons', () => {
	  expect(
		screen.queryByRole('button', { name: /like/i })
	  ).not.toBeInTheDocument()
  
	  expect(
		screen.queryByRole('button', { name: /remove/i })
	  ).not.toBeInTheDocument()
	})
  })

//Blog = ({ blog, handleLike, deleteBlog, user


test('The owner can also see a delete buttons', () => {

	

	const validUser =
	{
		  username: '123'
	}

	const validBlog = {
		title: 'Testing with Vitest',
		author: 'Jane Developer',
		url: 'https://example.com/testing-vitest',
		likes: 5,
		user: validUser
	  }

	render(<Blog blog={validBlog} user={validUser} />)

	expect(
		screen.queryByRole('button', { name: /remove/i })
	  ).toBeInTheDocument()

})

test('A logged in user can see the like button', () => {

	const owner =
	{
		  username: 'something'
	}
	

	const validUser =
	{
		  username: '23232'
	}

	const validBlog = {
		title: 'Testing with Vitest',
		author: 'Jane Developer',
		url: 'https://example.com/testing-vitest',
		likes: 5,
		user: owner
	  }

	render(<Blog blog={validBlog} user={validUser} />)

	expect(
		screen.queryByRole('button', { name: /like/i })
	  ).toBeInTheDocument()
	
	  expect(
		screen.queryByRole('button', { name: /remove/i })
	  ).not.toBeInTheDocument()

})

test(' blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
	const validBlog = {
		title: 'Testing with Vitest',
		author: 'Jane Developer',
		url: 'https://example.com/testing-vitest',
		likes: 5,
		user: '123'
	  }
	
	const mockHandler = vi.fn()
  
	render(
	  <Blog blog={validBlog} 
	  handleLike={mockHandler}
	  user={{ username: 'someone' }} 
	  />
	)
  
	//const user = userEvent.setup() unus
	
	
  	
	expect(screen.getByText(/https:\/\/example.com\/testing-vitest/)).toBeInTheDocument()
	expect(screen.getByText(/5/)).toBeInTheDocument()

	
  })


test('clicking the button calls event handler once', async () => {
	const validBlog = {
		title: 'Testing with Vitest',
		author: 'Jane Developer',
		url: 'https://example.com/testing-vitest',
		likes: 5,
		user: '123'
	  }
	
	const mockHandler = vi.fn()
  
	render(
	  <Blog blog={validBlog} 
	  handleLike={mockHandler}
	  user={{ username: 'someone' }} 
	  />
	)
  
	const user = userEvent.setup()

	const button = screen.getByText('LIKE')
	
	await user.click(button)
	await user.click(button)
  
	expect(mockHandler.mock.calls).toHaveLength(2)
  })

  
 