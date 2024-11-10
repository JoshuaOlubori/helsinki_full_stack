const _ = require("lodash");

const dummy = (blogs) => {
  console.log("dummy test output: ", blogs);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, current) => acc + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce(
    (max, current) => (current.likes > max.likes ? current : max),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorCounts = _.countBy(blogs, "author");

  const maxAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );

  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorLikes = _.transform(
    blogs,
    (result, blog) => {
      result[blog.author] = (result[blog.author] || 0) + blog.likes;
    },
    {}
  );

  const maxAuthor = _.maxBy(
    _.keys(authorLikes),
    (author) => authorLikes[author]
  );

  return {
    author: maxAuthor,
    likes: authorLikes[maxAuthor],
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
