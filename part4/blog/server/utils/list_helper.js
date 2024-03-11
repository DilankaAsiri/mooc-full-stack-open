const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favouriteBlog = (blogs) => {
  const _blogs = blogs.map((blog) => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    };
  });
  return _blogs.reduce((max, cur) => {
    return cur.likes > (max?.likes ?? 0) ? cur : max;
  }, null);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
