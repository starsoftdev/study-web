'use strict'

let createWebpackConfig = require('./webpack.make')

module.exports = function (config) {
  config.set({
    browsers: [
      'Chrome'
    ],
    singleRun: true,
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
    }
  })
}
