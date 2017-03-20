/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const request = require('request');
const compression = require('compression');

const logView = (req) => {
  const partsArr = req.url.split('-');

  if (req.method === 'GET' && partsArr.length > 1) {
    if (!isNaN(parseInt(partsArr[0].replace(/\//g, '')))) {
      const options = {
        uri: `${process.env.API_URL}/landingPageViews/logView`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        json: {
          studyId: parseInt(partsArr[0].replace(/\//g, '')),
          host: req.headers.host,
          connection: req.headers.connection,
          'cache-control': req.headers['cache-control'],
          'user-agent': req.headers['user-agent'],
          cookie: req.headers.cookie,
          method: req.method,
          ip: req.connection.remoteAddress,
        },
      };

      request(options, (error) => {
        if (error) {
          console.trace(error);
        }
      });
    }
  }
};

const addDevMiddlewares = (app, webpackConfig) => {
// Dev middleware
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('/app*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'app.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  app.get('*', (req, res) => {
    logView(req);
    fs.readFile(path.join(compiler.outputPath, 'corporate.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('/app*', (req, res) => res.sendFile(path.resolve(outputPath, 'app.html')));
  app.get('*', (req, res) => {
    logView(req);
    res.sendFile(path.resolve(outputPath, 'corporate.html'));
  });
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
