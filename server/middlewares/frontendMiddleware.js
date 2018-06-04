/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const request = require('request');
const compression = require('compression');
const pug = require('pug');
const Promise = require('bluebird');
const lookup = require('country-code-lookup');
const PagesService = require('../services/pages.service');
const getLandingPageLocals = require('../views/landing-page.locals');

const readFile = (fs, filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, file) => {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    });
  });
};

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

/**
 * Making specific routes to be rendered on server.
 *
 * @param {Object} app Express server app instance
 * @param {Object} fs File system utility
 * @param {String} templatePath Path to React HTML template
 */
const reserveSsrRoutes = (app, fs, templatePath) => {
  app.get('/:landingId([0-9]+)-*/', async (req, res) => {
    try {
      logView(req);
      const landingId = req.params.landingId;
      const landing = await PagesService.fetchLanding(landingId);
      const file = await readFile(fs, templatePath);
      const templateStr = file.toString();
      const viewPath = path.join(__dirname, '../views/landing-page.pug');
      const locals = getLandingPageLocals(landing);
      const ipcountry = req.headers['cf-ipcountry'] || null;
      let country = null;
      const ssrContent = pug.compileFile(viewPath)(locals);
      if (ipcountry) {
        country = lookup.byIso(ipcountry) ? lookup.byIso(ipcountry).internet : null;
      }
      // to avoid issue with alpha-2 GB code of UK
      if (ipcountry === 'UK') {
        country = 'GB';
      }
      const facebookDescription = `Interested in a ${locals.title.replace(/study/gi, 'Research Study')}? Click this Link and Sign Up for more information. Your local research site will call you with more information.`;

      // Meta tags can be put inside body, but better to put inside head tag to be a valid HTML.
      const result = templateStr      // If there are no needs for SSR for SEO purpose, just comment out below line and just keep medias tags as SSR.
        .replace('<div id="app"></div>', ssrContent)
        .replace(
          '<meta property="og:title" content="StudyKIK">',
          `<meta property="og:title" content="${locals.title}">`
        )
        .replace(
          '<meta property="og:description" content="StudyKIK">',
          `<meta property="og:description" content="${facebookDescription}">`
        )
        .replace(
          '<meta property="og:image" content="">',
          `<meta property="og:image" content="${locals.imgSrc || ''}">`
        )
        .replace(
          '<meta property="og:url" content="">',
          `<meta property="og:url" content="${req.url}">`
        )
        .replace(
          '<meta property="ipcountry" content="">',
          `<meta property="ipcountry" content="${(country) || 'US'}">`
        );
      res.send(result);
    } catch (e) {
      if (e.statusCode === 404) {
        res.redirect('/404');
      } else {
        res.redirect('/503');
      }

      // console.log('here', e);
    }
  });
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

  const serverPublicPath = webpackConfig.output.serverPublicPath || path.resolve(process.cwd(), 'public');
  app.use('/images', express.static(serverPublicPath));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('/lv10', (req, res) => res.redirect(301, 'https://studykik.com/4000175-kik-site'));

  app.get('/lv13', (req, res) => res.redirect(301, 'https://studykik.com/4001199-lv13'));

  app.get('/lv14', (req, res) => res.redirect(301, 'https://studykik.com/4001200-lv14'));

  app.get('/lv15', (req, res) => res.redirect(301, 'https://studykik.com/4001549-lv15'));

  app.get('/lv16', (req, res) => res.redirect(301, 'https://studykik.com/4001550-lv16'));

  app.get('/lv17', (req, res) => res.redirect(301, 'https://studykik.com/4002638-lv17'));

  app.get('/lv18', (req, res) => res.redirect(301, 'https://studykik.com/4002640-lv18'));

  app.get('/lv19', (req, res) => res.redirect(301, 'https://studykik.com/4003510-lv19'));

  app.get('/lv20', (req, res) => res.redirect(301, 'https://studykik.com/4003763-lv20'));

  app.get('/lv21', (req, res) => res.redirect(301, 'https://studykik.com/4004201-lv21'));

  app.get('/lv22', (req, res) => res.redirect(301, 'https://studykik.com/4004495-lv22'));

  app.get('/patients', (req, res) => res.redirect(301, 'https://studykik.com/list-your-trials'));

  app.get('/app*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'app.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  app.get('/admin*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'admin.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  // for loader.io verification
  app.get('/loaderio-9719d1a0d138bda492e5d8e90a243c6e', (req, res) => {
    res.send('loaderio-9719d1a0d138bda492e5d8e90a243c6e');
  });
  app.get('/loaderio-446030d79af6fc10143acfa9b2f0613f', (req, res) => {
    res.send('loaderio-446030d79af6fc10143acfa9b2f0613f');
  });

  reserveSsrRoutes(app, fs, path.join(compiler.outputPath, 'corporate.html'));

  app.get('/404', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'corporate.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(404).send(file.toString());
      }
    });
  });

  app.get('/503', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'corporate.html'), (err, file) => {
      if (err) {
        res.sendStatus(503);
      } else {
        res.status(503).send(file.toString());
      }
    });
  });

  app.get('*', (req, res) => {
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

  const serverPublicPath = options.serverPublicPath || path.resolve(process.cwd(), 'public');
  app.use('/images', express.static(serverPublicPath));

  app.get('/app*', (req, res) => res.sendFile(path.resolve(outputPath, 'app.html')));

  app.get('/admin*', (req, res) => res.sendFile(path.resolve(outputPath, 'admin.html')));

  app.get('/lv10', (req, res) => res.redirect(301, 'https://studykik.com/4000175-kik-site'));

  app.get('/lv13', (req, res) => res.redirect(301, 'https://studykik.com/4001199-lv13'));

  app.get('/lv14', (req, res) => res.redirect(301, 'https://studykik.com/4001200-lv14'));

  app.get('/lv15', (req, res) => res.redirect(301, 'https://studykik.com/4001549-lv15'));

  app.get('/lv16', (req, res) => res.redirect(301, 'https://studykik.com/4001550-lv16'));

  app.get('/lv17', (req, res) => res.redirect(301, 'https://studykik.com/4002638-lv17'));

  app.get('/lv18', (req, res) => res.redirect(301, 'https://studykik.com/4002640-lv18'));

  app.get('/lv19', (req, res) => res.redirect(301, 'https://studykik.com/4003510-lv19'));

  app.get('/lv20', (req, res) => res.redirect(301, 'https://studykik.com/4003763-lv20'));

  app.get('/lv21', (req, res) => res.redirect(301, 'https://studykik.com/4004201-lv21'));

  app.get('/lv22', (req, res) => res.redirect(301, 'https://studykik.com/4004495-lv22'));

  app.get('/patients', (req, res) => res.redirect(301, 'https://studykik.com/list-your-trials'));

  // for loader.io verification
  app.get('/loaderio-9719d1a0d138bda492e5d8e90a243c6e', (req, res) => {
    res.send('loaderio-9719d1a0d138bda492e5d8e90a243c6e');
  });
  app.get('/loaderio-446030d79af6fc10143acfa9b2f0613f', (req, res) => {
    res.send('loaderio-446030d79af6fc10143acfa9b2f0613f');
  });

  reserveSsrRoutes(app, require('fs'), path.resolve(outputPath, 'corporate.html'));

  app.get('/404', (req, res) => {
    res.status(404).sendFile(path.resolve(outputPath, 'corporate.html'));
  });

  app.get('/503', (req, res) => {
    res.status(503).sendFile(path.resolve(outputPath, 'corporate.html'));
  });

  app.get('*', (req, res) => {
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
