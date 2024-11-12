const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  logger.info("post blog id is: ", request.params.id);
  logger.info("post blog is: ", blog);
  blog ? response.json(blog) : response.status(404).end();
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});


blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  logger.info("blog body is:", body);
  if (!body.title || !body.url) {
    return response.status(400).send({ error: "Title and URL are required" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  logger.info("saved blog is:", savedBlog);
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
