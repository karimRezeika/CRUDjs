const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);

app.listen(3000, () => {
  console.log(`running`);
});

const url = "http://localhost:3000/";

const persons = [
  {
    id: 1,
    name: "Karim",
    age: 21,
    gender: "male",
    email: "Karim@gmail.com",
  },
  {
    id: 2,
    name: "ahemd",
    age: 23,
    gender: "male",
    email: "ahemd@gmail.com",
  },
  {
    id: 3,
    name: "mohamed",
    age: 24,
    gender: "male",
    email: "mohamed@gmail.com",
  },
  {
    id: 4,
    name: "saad",
    age: 28,
    gender: "male",
    email: "saad@gmail.com",
  },
];

app.get("/persons", (req, res) => {
  res.json(persons);
});

app.post("/persons", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const email = req.body.email;
  const id = Math.floor(Math.random() * 1000);
  const person = { id, name, age, gender, email };
  persons.push(person);
  res.send("added");
});

app.get("/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((p) => {
    if (p.id === id) return true;
    else return false;
  });
  if (person) {
    res.json(person);
  } else {
    res.send("not found");
  }
});

app.put("/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((p) => {
    if (p.id === id) return true;
    else return false;
  });

  if (person) {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const email = req.body.email;
    person.name = name;
    person.age = age;
    person.gender = gender;
    person.email = email;
    res.send("updated");
  } else {
    res.send("not found");
  }
});

app.delete("/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = persons.findIndex((p) => p.id === id);
  if (index !== -1) {
    persons.splice(index, 1);
    res.send("Deleted Success");
  } else {
    res.send("Person not found");
  }
});

// app.delete("/persons/:id", (req, res) => {
//   const id = req.params.id;
//   const index = persons.findIndex((p) => {
//     if (p.id === id) return true;
//     else return false;
//   });

//   if (index !== -1) {
//     persons.splice(index, 1);
//     res.send("deleted");
//   } else {
//     res.send("not found");
//   }
// });
