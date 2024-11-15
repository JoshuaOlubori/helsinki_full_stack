const { test, describe } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")

const biggerList =

[
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog =

[
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 5,
    __v: 0
  }
]

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    assert.strictEqual(
      listHelper.totalLikes(listWithOneBlog),
      listWithOneBlog[0].likes
    )
  })

  test("of a bigger list is done right", () => {
    assert.strictEqual(listHelper.totalLikes(biggerList), 36)
  })
})

describe("favourite blog", () => {
  test("of empty input handling", () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test("of a single blog input", () => {

    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test("of a multiple blogs with same maximum likes", () => {
    const testBlog = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 30,
      },
      {
        title: "Theoretical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 30,
      },
    ]
    assert.deepStrictEqual(listHelper.favoriteBlog(testBlog), testBlog[0])
  })
})

describe("mostBlogs functionality tests", () => {
  const result = {
    author: "Robert C. Martin",
    blogs: 3,
  }
  test("test of multiple blogs", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(biggerList), result)
  })
  test("test of single blog", () => {
    const result = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    }
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), result)
  })

  test("test of empty blog list", () => {
    const result = null
    assert.deepStrictEqual(listHelper.mostBlogs([]), result)
  })
})

describe("mostLikes functionality tests", () => {
  const result = {
    author: "Edsger W. Dijkstra",
    likes: 17
  }
  test("test of multiple blogs", () => {
    assert.deepStrictEqual(listHelper.mostLikes(biggerList), result)
  })
  test("test of single blog", () => {
    const result = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    }
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), result)
  })

  test("test of empty blog list", () => {
    const result = null
    assert.deepStrictEqual(listHelper.mostLikes([]), result)
  })
})
