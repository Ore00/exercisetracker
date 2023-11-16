const DB = require("../db.js");

const { exerciseSchema } = require("./exercises.js");

let db = new DB();
const userSchema = new db.mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  exercises: {
    type: [exerciseSchema],
    default: () => ([])
  }
});

const User = db.mongoose.model('User', userSchema);

exports.User = User;
exports.userSchema = userSchema;
