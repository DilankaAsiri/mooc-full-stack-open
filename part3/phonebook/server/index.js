require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

app.get("/info", (request, response) => {
  response.send(
    `<div><p>Phonebooke has info for ${
      persons.length
    } people</p><p>${new Date().toString()}</p></div>`
  );
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;

  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const name = body.name;

  const personExists = await Person.exists({
    name: { $regex: name, $options: "i" },
  });
  if (personExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  let person = new Person({
    name,
    number: body.number,
  });

  person = await person.save();
  response.json(person);
});

app.get("/api/persons/:id", async (request, response) => {
  const id = request.params.id;
  const person = await Person.findById(id);
  response.json(person);
});

app.get("/api/persons", async (request, response) => {
  const persons = await Person.find({});
  response.json(persons);
});

app.patch("/api/persons/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  let person = await Person.findById(id);
  if (!person) {
    return response.status(404).json({
      error: "person not found",
    });
  }

  if (body.number) person.number = body.number;
  person.isNew = false;

  person = await person.save();
  response.json(person);
});

app.delete("/api/persons/:id", async (request, response) => {
  const id = request.params.id;
  await Person.findByIdAndDelete(id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
