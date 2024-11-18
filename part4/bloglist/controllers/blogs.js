const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  logger.info("post blog id is: ", request.params.id)
  logger.info("post blog is: ", blog)
  blog ? response.json(blog) : response.status(404).end()
})

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
  const blog = await Blog.findById(request.params.id)
  // const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response
      .status(401)
      .json({ error: "you can only delete own blogs" })
  }
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
  const user = await User.findById(decodedToken.id)

  logger.info("blog body is:", body)
  if (!body.title || !body.url) {
    return response.status(400).send({ error: "Title and URL are required" })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  logger.info("saved blog is:", savedBlog)
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
