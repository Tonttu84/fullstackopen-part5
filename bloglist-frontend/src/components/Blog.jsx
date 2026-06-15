
import {	BlogContainer,	BlogTitle,	BlogMeta,	BlogActions,	DangerButton, OutlineButton
  } from '../styles/components'

const Blog = ({ blog, handleLike, deleteBlog, user}) => {

	if (!blog) return null

	

	

	return(
		<BlogContainer>
 <BlogTitle>{blog.title}</BlogTitle>
		
 <BlogMeta>
        by {blog.author}<br />
        <a href={blog.url}>{blog.url}</a><br />
        Added by {blog.user.name}
      </BlogMeta>

	  <BlogActions>
		{blog.likes} likes 
		{user &&( 
		<OutlineButton onClick={() => handleLike(blog)}>LIKE</OutlineButton>

		)}
		{user && blog.user.username == user.username && (
		<DangerButton onClick={() => deleteBlog(blog)}>REMOVE</DangerButton>

		)}
		</BlogActions>
		
  </BlogContainer>
  ) 
}

export default Blog