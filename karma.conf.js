'use strict'

let createWebpackConfig = require('./webpack.make')

module.exports = function (config) {
  config.set({
    browsers: [
      'Chrome'
    ],
    singleRun: !process.env.TEST_WATCH,
    frameworks: [
      'mocha', 'sinon'
    ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [
        'webpack',
        'sourcemap'
      ]
    },
    reporters: [
      'dots'
    ],
    webpack: createWebpackConfig('test'),
    webpackServer: {
      noInfo: true
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: [ '--no-sandbox' ]
      }
    }
  })
}
