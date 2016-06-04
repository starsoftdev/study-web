require('tests-globals')

var context = require.context('./client', true, /-test\.jsx?$/);
context.keys().forEach(context);
