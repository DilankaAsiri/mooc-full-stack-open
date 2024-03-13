const { describe, test, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.bulkSave(helper.initialBlogs.map((blog) => new Blog(blog)));
  });

  test("blogs are returned as json and number of blogs are the number of initialBlogs", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("all blogs has property id", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
    response.body.forEach((blog) => {
      assert.ok(
        Object.keys(blog).includes("id"),
        `${JSON.stringify(blog)} does not have property "id"`
      );
    });
  });

  describe("addition of a new blog", () => {
    test("succeeds with valid data", async () => {
      const newBlog = helper.newBlog;

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
      assert.ok(
        blogsAtEnd.find(
          (blog) =>
            blog.title === newBlog.title &&
            blog.author === newBlog.author &&
            blog.url === newBlog.url &&
            blog.likes === newBlog.likes
        ),
        "Blog not added to database"
      );
    });

    test("succeeds without like property", async () => {
      const { likes, ...newBlog } = helper.newBlog;

      const newBlogResult = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
      assert.strictEqual(newBlogResult.body.likes, 0);
    });

    test("fails without url property", async () => {
      const { url, ...newBlog } = helper.newBlog;

      await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("fails without title property", async () => {
      const { title, ...newBlog } = helper.newBlog;

      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });
  });

  describe("update of a blog", () => {
    test("succeeds with status code 200 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const requestData = {
        likes: blogToUpdate.likes + 1,
      };

      await api
        .patch(`/api/blogs/${blogToUpdate.id}`)
        .send(requestData)
        .expect(200);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
      assert.strictEqual(
        blogsAtEnd.find((blog) => blog.id === blogToUpdate.id).likes,
        requestData.likes
      );
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
