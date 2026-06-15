require('dotenv').config()

const mongoose = require('mongoose')

const User = require('./backend/modules/users/user.model')
const Blog = require('./backend/modules/blogs/blog.model')


const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    //console.log('Connected to MongoDB')

    // Clear existing data (optional)
    await User.deleteMany({})
    await Blog.deleteMany({})

    // Create users
    const users = await User.insertMany([
      { username: 'alice', name: 'Alice Doe', passwordHash: 'hashedpw1' },
      { username: 'bob', name: 'Bob Smith', passwordHash: 'hashedpw2' },
      { username: 'charlie', name: 'Charlie Brown', passwordHash: 'hashedpw3' }
    ])

    const [alice, bob, charlie] = users

    // Create blogs
    const blogs = await Blog.insertMany([
      { title: 'Alice Blog 1', author: 'Alice', url: 'http://a1.com', user: alice._id, likes: 5 },
      { title: 'Alice Blog 2', author: 'Alice', url: 'http://a2.com', user: alice._id },
      { title: 'Bob Blog', author: 'Bob', url: 'http://b.com', user: bob._id },
      { title: 'Charlie Blog 1', author: 'Charlie', url: 'http://c1.com', user: charlie._id },
      { title: 'Charlie Blog 2', author: 'Charlie', url: 'http://c2.com', user: charlie._id }
    ])

    // Link blogs to users
    for (const user of users) {
      const userBlogs = blogs
        .filter(b => b.user.toString() === user._id.toString())
        .map(b => b._id)

      user.blogs = userBlogs
      await user.save()
    }

    //console.log('Database seeded successfully')

  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.connection.close()
  }
}

seed()