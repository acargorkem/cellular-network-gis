const express = require('express');
const { register, login, logout } = require('../controllers/userController');
const {
  userRegisterRules,
  userLoginRules,
} = require('../validations/userValidations');
const validator = require('../validations');

const router = express.Router();

router.post('/register', userRegisterRules(), validator, register);

router.post('/login', userLoginRules(), validator, login);

router.post('/logout', logout);

module.exports = router;
