const mongoose = require('mongoose');
const config = require('./baseConfig');

const dbConnect = () => {
  mongoose
    .connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('mongodb connected');
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = dbConnect();
