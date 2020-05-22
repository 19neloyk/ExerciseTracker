const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const DataStore = require("nedb");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const db = new DataStore({ filename: "test.db" });
db.loadDatabase();

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get("/getdata", (req, res) => {
  db.find({}, (err, data) => {
    res.json(data);
  });
});

app.post("/addEntry", (req, res) => {
  const data = req.body;
  console.log("HELLO HELLO HELLLO");
  console.log();
  console.log("HELLO HELLO HELLLO");
  db.remove({}, { multi: true }, function (err, numRemoved) {});
  for (var i = 0; i < data.length; i++) {
    db.insert({
      index: data[i].index,
      name: data[i].name,
      reps: data[i].reps,
      sets: data[i].sets,
      desc: data[i].desc,
    });
  }
  res.json({
    status: "success",
  });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);

/*
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const DataStore = require("nedb");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const db = new DataStore("database.db");
db.loadDatabase();

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get("/getdata", (req, res) => {
  console.log("MINECRAFT");
  db.find({}, (err, data) => {
    res.json(data);
  });
});

app.post("/addEntry", (req, res) => {
  const data = req.body;
  console.log("HELLO HELLO HELLLO");
  console.log(data[0]);
  console.log("HELLO HELLO HELLLO");
  // db.remove({}, { multi: true }, function (err, numRemoved) {});
  db.insert(data[0]);
  db.insert([{ a: 5 }, { a: 42 }], function (err, newDocs) {
    // Two documents were inserted in the database
    // newDocs is an array with these documents, augmented with their _id
  });
  res.json({
    status: "success",
  });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
*/
