import { BlogList } from '../styles/components'
import { Link } from 'react-router-dom'

const Blogs = ({ sortedBlogs }) => {
  return (
    <div>
      <h2>blogs</h2>

      <BlogList>
        {sortedBlogs.map(blog => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
      </BlogList>
    </div>
  )
}

export default Blogs
