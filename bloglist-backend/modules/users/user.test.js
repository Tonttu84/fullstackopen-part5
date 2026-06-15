
const test = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../../app')

const Blog = require('../blogs/blog.model')
const User = require('./user.model')
const db = require('../blogs/blog.test.database')




const api = supertest(app)

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


  await t.test('a valid user can be created', async () => {



	const newUser = {
	  username: 'testuser',
	  name: 'Johannes',
	  password: 'unsafe'
	}
  
	const created = await api
	  .post('/api/users')
	  .send(newUser)
	
	  assert(created.status, 201)
  
	const response = await api.get('/api/users')
    assert.strictEqual(response.status, 200)
	
  
	const usersInDb = await User.find({ username: 'testuser' })

  
  assert.strictEqual(usersInDb.length, 1)
  const user = usersInDb[0]

  assert.strictEqual(user.username, 'testuser')
 
  assert.strictEqual(user.name, 'Johannes')

 
  })

  await t.test('a non-valid user cant be created', async () => {



	const newUser = {
	  username: 'aa',
	  name: 'Johannes',
	  password: 'unsafe'
	}
  
	const response = await api
	  .post('/api/users')
	  .send(newUser)
	assert.strictEqual(response.status, 400)
  
	const response2 = await api.get('/api/users')
    assert.strictEqual(response2.status, 200)
  
	const usersInDb = await User.find({ username: 'aa' })

	assert.strictEqual(usersInDb.length, 0)

 
  })

  await t.test('a non-valid user cant be created', async () => {



	const newUser = {
	  username: 'testuser',
	  name: 'Johannes',
	  password: 'un'
	}
  
	const created = await api
	  .post('/api/users')
	  .send(newUser)
	  assert.strictEqual(created.status, 400)
  
	const response = await api.get('/api/users')
    assert.strictEqual(response.status, 200)
  
	const usersInDb = await User.find({ username: 'testuser' })

	assert.strictEqual(usersInDb.length, 0)

 
  })


  await t.test('a duplicate user cant be created', async () => {



	const newUser = {
	  username: 'testuser',
	  name: 'Johannes',
	  password: 'unsafe'
	}
  
	const created = await api
	  .post('/api/users')
	  .send(newUser)
	  assert.strictEqual(created.status, 201)
  
	const response = await api.get('/api/users')
    assert.strictEqual(response.status, 200)
  
	const usersInDb = await User.find({ username: 'testuser' })

  assert.strictEqual(usersInDb.length, 1)
  const user = usersInDb[0]
  
  assert.strictEqual(user.username, 'testuser')

  assert.strictEqual(user.name, 'Johannes')

  	const duplicateUser = {
	  username: 'testuser',
	  name: 'Johannes',
	  password: 'unsafe'
	}
  
	const duplicated = await api
	  .post('/api/users')
	  .send(duplicateUser)
	  assert.strictEqual(duplicated.status, 400)

  const usersInDb2 = await User.find({ username: 'testuser' })

  assert.strictEqual(usersInDb2.length, 1)
  const user2 = usersInDb[0]
  assert.strictEqual(user2.username, 'testuser')
  assert.strictEqual(user2.name, 'Johannes')

 
  })

})