import { render, screen } from '@testing-library/react'
import AddBlog from './components/AddBlog'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

test('<AddBlog /> calls the event handler it received as props with the right details when a new blog is created', async () => {
  const mockCreate = vi.fn()
  const user = userEvent.setup()

  render(
    <MemoryRouter>
      <AddBlog createBlog={mockCreate} notifMessage={null} />
    </MemoryRouter>
  )

  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'React Testing')
  await user.type(inputs[1], 'Matti')
  await user.type(inputs[2], 'www.test.com')

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(mockCreate).toHaveBeenCalledTimes(1)

  expect(mockCreate).toHaveBeenCalledWith({
    title: 'React Testing',
    author: 'Matti',
    url: 'www.test.com'
  })
})