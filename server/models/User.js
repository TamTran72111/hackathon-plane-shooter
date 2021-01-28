const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model('User', UserSchema);

const SALT_ROUNDS = 10;

User.signUp = async (username, password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    username,
    password: hashedPassword,
  });
  return user.save();
};

User.login = async (username, password) => {
  const user = await User.findOne({ username });
  if (user) {
    return await bcrypt.compare(password, user.password);
  }
  throw { message: 'Username not found' };
};

module.exports = User;
