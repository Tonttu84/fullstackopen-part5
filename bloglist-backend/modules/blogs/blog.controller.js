const blogRouter = require('express').Router()
const Blog = require('./blog.model.js')
const User = require('../users/user.model')

const { tokenExtractor, userExtractor } = require('../../middleware/auth.js')



blogRouter.get('/', async (request, response) => {
	
	
	const blogs = await Blog.find({})
	.populate('user', { username: 1, name: 1 })
	response.json(blogs)
	
  })
  
  blogRouter.get('/blogs/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
      .populate('user', {
        username: 1,
        name: 1
      })

    if (!blog) {
      return response.status(404).json({
        error: 'blog not found'
      })
    }

    response.json(blog)

  } catch (error) {
    next(error)
  }
})
  



blogRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
	const blog = new Blog({
  title: request.body.title,
  author: request.body.author,
  url: request.body.url
})
  
  const user = await User.findById(request.userId)

  if (!user) { return response.status(401).json({ error: 'invalid token' }) }

  blog.user = user._id

	const result = await blog.save()
	response.status(201).json(result)

  })



  blogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const { id } = request.params

  
  const blog = await Blog.findById(id)
   if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  
 
  if (!blog.user.equals(request.userId)) {
  return response.status(403).json({ error: 'forbidden' })
}

  await blog.deleteOne()

  response.status(204).end()
})


blogRouter.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const { id } = request.params
  const userId = request.userId

  
  const blog = await Blog.findById(id)

  if (!blog) {
	//console.log('blog.user:', blog?.user?.toString() || 'missing user')
	//console.log('request.userId:', (userId || 'invalid id' ))
  return response.status(404).json({ error: 'blog not found' })
}

const isOwner = blog.user.toString() === userId

if (isOwner) {
	blog.title = request.body.title
	blog.author = request.body.author
	blog.url = request.body.url
	blog.likes = request.body.likes
  } else {
	if (blog.title != request.body.title || blog.author != request.body.author || blog.url != request.body.url )
	{
		return response.status(403).json({ error: 'Edit not authorized' })
	}
	blog.likes = request.body.likes
  }

  const saved = await blog.save()
  await saved.populate('user', { username: 1, name: 1 })

  response.json(saved)
})

blogRouter.post('/:id/like', tokenExtractor, async (req, res) => {
	const { id } = req.params
  
	const blog = await Blog.findByIdAndUpdate(
	  id,
	  { $inc: { likes: 1 } },
	  { new: true }
	)
  
	if (!blog) {
	  return res.status(404).json({ error: 'not found' })
	}
  
	res.json(blog)
  })


module.exports = blogRouter