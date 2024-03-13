const express = require("express");
require('express-async-errors')
const cors = require("cors");
const { errorHandler } = require("./middleware/error_handler");
const blogRouter = require("./controllers/blog");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(errorHandler);

module.exports = app;
