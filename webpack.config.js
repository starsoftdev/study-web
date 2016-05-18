var createWebpackConfig = require('./webpack.make')
module.exports = createWebpackConfig(process.env.NODE_ENV || 'development');
