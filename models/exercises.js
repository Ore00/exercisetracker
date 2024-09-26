const DB = require("../db.js");
const moment = require('moment');

let db = new DB();
const exerciseSchema = new db.mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: moment.utc()
  }
});
const Exercise = db.mongoose.model('Exercise', exerciseSchema);

exports.exerciseSchema = exerciseSchema;
exports.Exercise = Exercise;
