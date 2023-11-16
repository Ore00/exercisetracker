const { Exercise } = require("../models/exercises.js");
const { findUserById } = require("./users.js");
const moment = require('moment');

const createAndSaveExercise = async (data) => {
  let exercise = new Exercise({
    description: data.description,
    duration: data.duration,
    date: data.date ? moment.utc(data.date) : moment.utc()
  });

  try {
    let user = await findUserById(data.userId);
    if (user.exercises) {
      user.exercises.push(exercise);
      let result = await user.save();
      return result;
    }
  } catch (err) {
    console.error("error", err);
    return err.code;
  }
};


exports.CreateExercise = createAndSaveExercise;