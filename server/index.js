var path = require('path')
var express = require('express')
var logger = require('winston')
var webpack = require('webpack')
var config = require('../webpack.config')

var app = express()
var PORT = process.env.PORT || 8080
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  contentBase: path.join(__dirname, '/../dist/'),
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

app.use(require('webpack-hot-middleware')(compiler))

logger.level = process.env.LOGGER_LEVEL || (process.env.NODE_ENV === 'development'? 'debug': 'info')

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/', 'index.html'))
})

app.listen(PORT, (err) => {
  if (err) {
    logger.error(err)
  } else {
    logger.info('==> 🌎  Listening on PORT %s. Open up http://localhost:%s/ in your browser.', PORT, PORT)
  }
})
