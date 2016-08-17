'use strict'

let context = require.context('./client', true, /-test\.jsx?$/)
context.keys().forEach(context)
