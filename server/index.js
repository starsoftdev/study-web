/* eslint consistent-return:0 */
require('dotenv').load();

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 5000 if not provided
const port = argv.port || process.env.PORT || 5000;

// import the server handling over HTTPS and HTTP
const https = require('https');
const http = require('http');

app.start = (httpOnly) => {
  if (httpOnly === undefined) {
    /* eslint-disable no-param-reassign */
    httpOnly = process.env.HTTP;
  }
  let server = null;
  if (!httpOnly) {
    /* eslint-disable global-require */
    const sslConfig = require('./ssl-config');

    const options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate,
    };
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }
  // Start your app.
  server.listen(port, (err) => {
    if (err) {
      return logger.error(err.message);
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
      ngrok.connect(port, (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr);
        }

        logger.appStarted(port, url);
      });
    } else {
      logger.appStarted(port);
    }
  });

  return server;
};

app.start();
