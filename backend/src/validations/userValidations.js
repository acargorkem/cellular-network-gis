const { body } = require('express-validator');
const UserService = require('../services/userService');

const userRegisterRules = () => [
  body('username', 'Username must be at least 2 characters long.')
    .isString()
    .isLength({ min: 2 })
    .custom(async (value) => {
      const existingUserName = await UserService.findOneBy('username', value);
      if (existingUserName) {
        return Promise.reject(new Error('Username already exists.'));
      }
      return true;
    }),
  body('email', 'Please enter a valid e-mail')
    .isEmail()
    .custom(async (value) => {
      const existingEmail = await UserService.findOneBy('email', value);
      if (existingEmail) {
        return Promise.reject(new Error('E-mail already exists.'));
      }
      return true;
    }),
  body('password', 'Please enter a password at least 6 characters.')
    .trim()
    .isLength({ min: 6 }),
];

const userLoginRules = () => [
  body('username', 'Username must be at least 2 characters long.')
    .isString()
    .isLength({ min: 2 }),
  body('password', 'Please enter a password at least 6 characters.')
    .trim()
    .isLength({ min: 6 }),
];

module.exports = {
  userRegisterRules,
  userLoginRules,
};
