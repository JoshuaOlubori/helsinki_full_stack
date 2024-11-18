const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response, next) => {
  // Error is being thrown before it reaches error handling middleware.
  // Fixing this by
  // modifying controller to properly handle the error using try-catch.
  try {
    const { username, name, password } = request.body

    if (password.length < 3 || username.length < 3) {
      const errorVar = password.length < 3 ? "Password" : "Username"
      return response
        .status(400)
        .json({ error: `${errorVar} must be at least 3 characters long` })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  response.json(users)
})

module.exports = usersRouter