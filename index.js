const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const exercise = require("./controllers/exercises.js");
const moment = require('moment');
const users = require("./controllers/users.js");
require('dotenv').config()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", async (req, res, next) => {
  try {
    let newUser = await users.CreateUser({
      username: req.body.username
    });

    if (newUser != 11000) {
      res.status(201).send({ username: newUser.username, _id: newUser._id });
    } else {
      let message = newUser == 11000 ? "Username already Exist." : "error code " + newUser + " occured.";
      res.status(422).send({ errors: message });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  next();
});

app.get("/api/users", async (req, res, next) => {
  try {
    let results = await users.GetUsers();
    res.status(200).send(results);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/users/:_id/exercises", async (req, res, next) => {
  try {
    let result = await exercise.CreateExercise({
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date,
      userId: req.params._id
    });
    if (result.exercises) {
      let newExercise = result.exercises.pop();
      let json = {
        "_id": result._id,
        "username": result.username,
        "date": formatDateString(newExercise.date),
        "duration": newExercise.duration,
        "description": newExercise.description
      }
      res.status(200).send(json);
    } else {
      throw new TypeError("there was an issue creating the exercise.");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  next();
});

app.get("/api/users/:_id/logs", async (req, res) => {
  try {
    let result = await users.findUserById(req.params._id);
    let log;
    if (req.query.from) {
      if (!req.query.to) {
        throw new TypeError("'to' date query filter required with 'from' date query filter");
      }
      let filtered = result.exercises.filter(exercise => {
        return exercise.date >= moment.utc(req.query.from) &&
          exercise.date <= moment.utc(req.query.to)
      }).map(obj => {
        return { ...obj, date: formatDateString(obj.date) };
      })
      log = filtered;
    } else {
      log = result.exercises.map(obj => {
        return { ...obj, date: formatDateString(obj.date) };
      });
    }

    let json = {
      "_id": result._id,
      "username": result.username,
      "count": log.length,
      "log": req.query.limit ? log.slice(0, req.query.limit) : log
    };

    res.status(200).send(json);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

const formatDateString = (dateString) => {
  return moment(dateString).format("ddd MMM DD YYYY");
};