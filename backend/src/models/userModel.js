const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      unique: true,
    },
    hash: { type: String, select: false },
    salt: { type: String, select: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
