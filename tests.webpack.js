'use strict'

require('tests-globals')

let context = require.context('./client', true, /-test\.jsx?$/)
context.keys().forEach(context)
