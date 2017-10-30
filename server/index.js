/* eslint consistent-return:0 */
require('dotenv').load();

const express = require('express');
const logger = require('./logger');
const helmet = require('helmet');
const cors = require('cors');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

app.use(helmet());

// setup CORS for production
// wasn't able to set up CORS for not blocking client requests to it if it wasn't set to allow for all IPs
const corsOptions = {
  credentials: true,
  maxAge: 86400,
};
corsOptions.origin = '*';
app.use(cors(corsOptions));

app.use(express.static('public'));

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
    https.globalAgent.maxSockets = 50;
    server = https.createServer(options, app);
  } else {
    http.globalAgent.maxSockets = 50;
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
