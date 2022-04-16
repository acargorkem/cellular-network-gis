const passport = require('passport');
const UserService = require('../services/userService');
const { generateSaltAndHash, userToJSON } = require('../utils/auth');

const register = async (req, res) => {
  const { username, password } = req.body;
  const { salt, hash } = generateSaltAndHash(password);

  const user = await UserService.save({
    username,
    hash,
    salt,
  });

  req.login(user, (err) => {
    if (err) {
      res.status(400);
      return res.json({ error: err.message });
    }
    const safeUser = userToJSON(user._doc);
    res.status(201);
    return res.json({ user: safeUser });
  });
};

const login = async (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error) {
      res.status(400);
      return res.json({ error: error.message });
    }
    return req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send({ user });
    });
  })(req, res, next);
};

const logout = async (req, res) => {
  req.logOut();
  res.status(200);
  return res.json({ message: 'Successfully logged out' });
};

module.exports = {
  register,
  login,
  logout,
};
