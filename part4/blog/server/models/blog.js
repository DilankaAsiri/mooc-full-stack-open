const mongoose = require("mongoose");
const config = require("../utils/config");
const { info, error } = require("../utils/logger");

mongoose.set("strictQuery", false);
const url = config.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    error("error connecting to MongoDB:", error.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
