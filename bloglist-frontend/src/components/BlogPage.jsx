
import Blog from './Blog'
import { useParams, useNavigate } from 'react-router-dom'

const BlogPage = ({ blogs, handleLike, deleteBlog, user }) => {
  const { id } = useParams()

  const blog = blogs.find(b => b.id === id)
  const navigate = useNavigate()

  if (!blog) return null

  
  const handleDelete = async () => {
    await deleteBlog(blog)
    navigate('/')
  }   

  return (
    <Blog
      blog={blog}
      handleLike={handleLike}
      deleteBlog={handleDelete}
      user={user}
    />
  )
}

export default BlogPage