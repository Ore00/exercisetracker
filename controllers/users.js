const { User } = require("../models/users.js");

const createAndSaveUser = async (data) => {
  let user = new User({
    username: data.username,
  });
  try {
    let result = await user.save();
    return result;
  } catch (err) {
    return err.code;
  }
};

const getAllUsers = async () => {
  let users = await User.find({})
    .then(users => users)
    .catch(err => { error: err.message });
  return users;
}

const findUserById = async (userId) => {
  let user = await User.findById(userId)
    .then(user => user)
    .catch(err => { error: err.message });

  user.exercises.sort((firstItem, secondItem) => firstItem.date - secondItem.date);

  return user;
};

exports.CreateUser = createAndSaveUser;
exports.findUserById = findUserById;
exports.GetUsers = getAllUsers;
