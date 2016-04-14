require('dotenv').config();
module.exports = require('./webpack.make')({
  BUILD: false,
  TEST: true
});
