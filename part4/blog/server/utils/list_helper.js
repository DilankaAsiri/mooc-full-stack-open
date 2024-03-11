const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favouriteBlog = (blogs) => {
  return blogs.reduce((max, cur) => {
    return cur.likes > (max?.likes ?? 0)
      ? { title: cur.title, author: cur.author, likes: cur.likes }
      : max;
  }, null);
};

const mostBlog = (blogs) => {
  const mostBlogSummary = _(blogs)
    .groupBy("author")
    .map((blogsArr, author) => {
      return {
        author,
        blogs: blogsArr.length,
      };
    })
    .value();

  return _.maxBy(mostBlogSummary, "blogs") ?? null;
};

module.exports = {
  dummy,
  mostBlog,
  totalLikes,
  favouriteBlog,
};
