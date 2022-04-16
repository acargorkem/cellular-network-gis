const BaseService = require('./baseService');
const UserModel = require('../models/userModel');

class UserService extends BaseService {
  model = UserModel;
}
module.exports = new UserService();
