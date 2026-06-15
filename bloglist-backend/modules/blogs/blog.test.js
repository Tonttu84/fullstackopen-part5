const test = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const listHelper = require('./blog.test.helper')
const Blog = require('./blog.model')
const User = require('../users/user.model')
const db = require('./blog.test.database')
const { blogs } = require('./blog.test.data')

const api = supertest(app)

const initialBlogs = 5

test('blog backend tests', async (t) => {

await t.before(async () => {
	await db.connect()
  })
  
  await t.beforeEach(async () => {
	await db.clearDatabase()
	await db.seedDatabase()
  })
  
  await t.after(async () => {
	await db.closeDatabase()
  })


  await t.test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

await t.test('total likes', async (t) => {

	await t.test('when list has only one blog, equals the likes of that', () => {
	  const result = listHelper.totalLikes([blogs[0]])
	  assert.strictEqual(result, 7)
	})
  
	await t.test('It works with multiple blogs too', () => {
	  const result = listHelper.totalLikes(blogs)
	  assert.strictEqual(result, 36)
	})
  
  })


  await t.test('I can find the author with most blogs', () => {

    const result = listHelper.mostBlogs(blogs)
	assert.deepStrictEqual(result, {
		author: "Robert C. Martin",
		blogs: 3
	  })

     })

	 await t.test('I can find the author with most likes in all blogs', () => {

    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
  author: "Edsger W. Dijkstra",
  likes: 17
})

     })     


	 await t.test('notes are returned as json',  async () => {


  const response = await api.get('/api/blogs')
    assert.strictEqual(response.status, 200)
    assert.match(
		response.headers['content-type'],
		/application\/json/
	  )

	assert.strictEqual(response.body.length, initialBlogs)
	
})


await t.test('blogs have id property instead of _id', async () => {
	const response = await api.get('/api/blogs')
  
	response.body.forEach(blog => {
	assert.notStrictEqual(blog.id, undefined)
	  assert.strictEqual(blog._id, undefined)
	})
  })



  await t.test('a valid blog owned by the user can be added and it increases the size by one', async () => {



  const users = await User.find({})
  const user = users[0]


  const token = listHelper.createToken(user)

	const newBlog = {
	  title: 'New blog',
	  author: 'Me',
	  url: 'http://example.com'
	}
  
	const response = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
	  .send(newBlog)
	
	assert.strictEqual(response.status, 201)
  
	const response2 = await api.get('/api/blogs')
  
	assert.strictEqual(response2.body.length, initialBlogs + 1)
	
  })

  await t.test('if likes is missing, it defaults to zero', async () => {
	
  const users = await User.find({})
  const user = users[0]
  const token = listHelper.createToken(user)

    const newBlog = {
	  title: 'extra new blog',
	  author: 'Metoo',
	  url: 'http://fakeexample.com'
	}
  


try {
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    assert.strictEqual(response.status, 201) 
    
  assert.strictEqual(response.body.likes, 0)
    } catch (error) {
      //console.log('Full error:', error)
      //console.log('Message:', error.message)

      throw error 
    }
  
	
  })

  await t.test('missing title returns 400', async () => {

  const users = await User.find({})
  const user = users[0]
  const token = listHelper.createToken(user)


	const newBlog = {
	  author: 'Metootoo',
	  url: 'http://fakefakeexample.com'
	}
  
	const response = await api
	  .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
	  .send(newBlog)
	  assert.strictEqual(response.status, 400)
  })
  
  await t.test('missing url returns 400', async () => {
  
  const users = await User.find({})
  const user = users[0]
  const token = listHelper.createToken(user)

	const newBlog = {
	  author: 'unknown',
	  title: 'myTitle'
	}
  
	const response = await api
	  .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
	  .send(newBlog)
	  assert.strictEqual(response.status, 400)
  })


  await t.test("deleting existing posts work", async () => {

  const users = await User.find({})
  const user = users[0]
  const token = listHelper.createToken(user)

  const newBlog = {
    title: 'extra new new blog',
    author: 'Metootiii',
    url: 'http://fakeexampleeeee.com'
  }

  const created = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    assert.strictEqual(created.status, 201)

  const id = created.body.id



 const response = await api
  	.delete(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    assert.strictEqual(response.status, 204)

  const responseAfterDelete = await api.get('/api/blogs')

  const ids = responseAfterDelete.body.map(b => b.id)

  
  assert.strictEqual(ids.includes(id), false)


})


await t.test("deleting existing posts is forbidden if you dont own them", async () => {

  const users = await User.find({})
  const user = users[0]
  const token = listHelper.createToken(user)

  const newBlog = {
    title: 'extra new new blog',
    author: 'Metootiii',
    url: 'http://fakeexampleeeee.com'
  }

  const created = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
	assert.strictEqual(created.status, 201)

  const id = created.body.id

  

  const user2 = users[1]
  const token2 = listHelper.createToken(user2)

 const response = await api
  	.delete(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token2}`)
	assert.strictEqual(response.status, 403)

  const responseAfterDelete = await api.get('/api/blogs')

  const ids = responseAfterDelete.body.map(b => b.id)

  assert.ok(ids.includes(id))
  


})


await t.test("Modifying old blogs works", async () => {

  const users = await User.find({})
  const user = users[0]
  const token = listHelper.createToken(user)

  const newBlog = {
    title: 'extra new new blogg',
    author: 'Metootiiii',
    url: 'http://fakeexampleeeee.comm'
  }

  const created = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
	assert.strictEqual(created.status, 201)

  const id = created.body.id

  const editedBlog = {
    title: 'updated title',
    author: 'Metootiiii',
    url: 'http://fakeexampleeeee.comm',
    likes: 2
  }

  const updated = await api
    .put(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(editedBlog)
    assert.strictEqual(updated.status, 200)

  
  assert.strictEqual(updated.body.title, 'updated title')
  
  assert.strictEqual(updated.body.likes, 2)
})

await t.test("Non-owner cannot modify blog content", async () => {

  const users = await User.find({})
  const user = users[0]
  const token = listHelper.createToken(user)

  const newBlog = {
    title: 'extra new new blogg',
    author: 'Metootiiii',
    url: 'http://fakeexampleeeee.comm'
  }

  const created = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    assert.strictEqual(created.status, 201)

  const id = created.body.id

  const editedBlog = {
    title: 'updated title',
    author: 'Metootiiii',
    url: 'http://fakeexampleeeee.comm',
    likes: 2
  }

  const user2 = users[1]
  const token2 = listHelper.createToken(user2)

    const response = await api
    .put(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token2}`)
    .send(editedBlog)
    assert.strictEqual(response.status, 403)

})

await t.test("Non-owner can change likes", async () => {

	const users = await User.find({})
	const user = users[0]
	const token = listHelper.createToken(user)
  
	const newBlog = {
	  title: 'extra new new blogg',
	  author: 'Metootiiii',
	  url: 'http://fakeexampleeeee.comm'
	}
  
	const created = await api
	  .post('/api/blogs')
	  .set('Authorization', `Bearer ${token}`)
	  .send(newBlog)
	  assert.strictEqual(created.status, 201)
  
	const id = created.body.id
  
	const editedBlog = {
	  title: 'extra new new blogg',
	  author: 'Metootiiii',
	  url: 'http://fakeexampleeeee.comm',
	  likes: 2
	}
  
	const user2 = users[1]
	const token2 = listHelper.createToken(user2)
  
	   const response = await api
	  .put(`/api/blogs/${id}`)
	  .set('Authorization', `Bearer ${token2}`)
	  .send(editedBlog)
		assert.strictEqual(response.status, 200)
  
  })


  await t.test("Modifying nonexistent blog returns 404", async () => {

  const users = await User.find({})
  const user = users[0]
  const token = listHelper.createToken(user)


  const id = new mongoose.Types.ObjectId()

  const editedBlog = {
    title: 'updated title',
    author: 'Metootiiii',
    url: 'http://fakeexampleeeee.comm',
    likes: 2
  }


   const response = await api
    .put(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(editedBlog)
    assert.strictEqual(response.status, 404)

 
})

})