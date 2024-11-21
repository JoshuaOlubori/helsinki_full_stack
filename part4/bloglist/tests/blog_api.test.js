const { test, after, beforeEach, describe } = require("node:test")
const assert = require("node:assert")
const logger = require("../utils/logger")
const helper = require("./test_helper")
const Blog = require("../models/blog")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const api = supertest(app)


describe("for some initial blog posts", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("admin", 10)
    const adminUser = new User({ username: "admin", passwordHash })
    const savedUser = await adminUser.save()

    const blogObjects = helper.initialBlogs.map((blog) => {
      return new Blog({
        ...blog,
        user: savedUser.id, // Associate each blog with the admin user
      })
    })

    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)


  })

  test("that blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("that all blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test("there are two blogs", async () => {
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test("the first blog is written by Chan", async () => {
    const response = await api.get("/api/blogs")

    const authors = response.body.map((e) => e.author)

    assert(authors.includes("Michael Chan"))
  })
})

describe("Deletion of a blog", () => {
  test("a specific blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb()
    logger.info("blog at start", blogsAtStart)
    const blogToDelete = blogsAtStart[0]

    logger.info("blog to delete", blogToDelete)

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "admin",
        password: "admin"
      })
      .set("Content-Type", "application/json")

    console.log("Login response body:", loginResponse.body)
    console.log("Login response status:", loginResponse.status)

    // Ensure login is successful
    assert.strictEqual(loginResponse.status, 200, "Login failed")
    assert.ok(loginResponse.body.token, "Token is missing from login response")

    const token = loginResponse.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    logger.info("remaining blog", blogsAtEnd)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)

    assert(!titles.includes(blogToDelete.title))



  })
})

describe("adding new blogs", () => {
  test("a valid blog can be added ", async () => {

    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "admin",
        password: "admin",
      })
      .set("Content-Type", "application/json")

    const token = loginResponse.body.token


    const newBlog = {
      title: "Node patterns",
      author: "Michael John",
      url: "https://reactpatterns.com/",
      likes: 2,
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .set("Content-Type", "application/json")

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.title)

    assert(titles.includes("Node patterns"))
  })

  test("fails with status code 400 if title or URL is not added", async () => {
    const newBlogSansTitle = {
      author: "Michael John",
      url: "https://reactpatterns.com/",
      likes: 2,
    }

    const newBlogSansUrl = {
      title: "Importance of SDG",
      author: "Michael John",
      likes: 28,
    }

    await api.post("/api/blogs").send(newBlogSansTitle).expect(400)
    await api.post("/api/blogs").send(newBlogSansUrl).expect(400)
  })
})



describe("Formatting of blog objects", () => {
  test("that unique identifier property of the blog posts is named id", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    response.body.forEach((blog) => {
      assert.ok(blog.id, "Expected 'id' to be defined")
      assert.strictEqual(blog._id, undefined, "Expected '_id' to be undefined")
    })
  })

  test("blog without likes is not defaulted to zero likes", async () => {
    const loginResponse = await api
      .post("/api/login")
      .send({
        username: "admin",
        password: "admin"
      })
      .set("Content-Type", "application/json")

    const token = loginResponse.body.token

    const newBlog = {
      title: "Django patterns",
      author: "Michael Oliver",
      url: "https://reactpatterns.com/",
    }

    const response = await api.post("/api/blogs")
      .set("Authorization", `Bearer ${token}`).send(newBlog).expect(201).expect("Content-Type", /application\/json/)
    const savedBlog = response.body
    logger.info("saved blog, ", savedBlog)

    assert.strictEqual(savedBlog.likes, 0)
  })
})



after(async () => {
  await mongoose.connection.close()
})
