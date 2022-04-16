const passport = require('passport');
const { Strategy } = require('passport-local');
const UserModel = require('../models/userModel');
const { userToJSON, validatePassword } = require('../utils/auth');

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await UserModel.findOne({
        username,
      }).select('+hash +salt');
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordMatched = validatePassword(user, password);
      if (!isPasswordMatched) {
        throw new Error('Wrong password');
      }

      const safeUser = userToJSON(user._doc);
      done(null, safeUser);
    } catch (err) {
      done(err, null);
    }
  })
);
