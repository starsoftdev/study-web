/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const URL = require('url').URL;
let SENTRY_DSN = null
if (process.env.SENTRY_DSN) {
  const sentryUrl = new URL(process.env.SENTRY_DSN);
  SENTRY_DSN = `${sentryUrl.protocol}//${sentryUrl.username}@${sentryUrl.hostname}${sentryUrl.pathname}`;
}

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  optimization: options.optimization || {},
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        // Transform our own .less files with LESS loader modules
        test: /\.less$/,
        use: options.lessLoaders,
      }, {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader'
          }
        ],
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            }
          },
        ],
      }, {
        test: /\.(mp3|wav|eot|svg|ttf|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }, {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              },
            },
          },
        ],
      }, {
        test: /\.html$/,
        use: 'html-loader',
      }, {
        test: /\.(mp4|webm)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          }
        ],
      }
    ]
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      API_URL: JSON.stringify(process.env.API_URL),
      FORCE_LOGOUT: process.env.FORCE_LOGOUT ? JSON.stringify(process.env.FORCE_LOGOUT) : 36000000,
      IDLE_TIMEOUT: process.env.IDLE_TIMEOUT ? JSON.stringify(process.env.IDLE_TIMEOUT) : 7200000,
      DASHBOARD_TIMEZONE: JSON.stringify(process.env.DASHBOARD_TIMEZONE),
      MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN ? JSON.stringify(process.env.MIXPANEL_TOKEN): null,
      SENTRY_DSN: SENTRY_DSN ? JSON.stringify(SENTRY_DSN): null,
      SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY ? JSON.stringify(process.env.GOOGLE_RECAPTCHA_SITE_KEY): null,
      SOCKET_URL: JSON.stringify(process.env.SOCKET_URL),
      OPTIMIZELY_PROJECT_ID: process.env.OPTIMIZELY_PROJECT_ID ? JSON.stringify(process.env.OPTIMIZELY_PROJECT_ID) : null,
      LOG_ROCKET: process.env.LOG_ROCKET ? JSON.stringify(process.env.LOG_ROCKET): null,
      ONE_SIGNAL_APP_ID: process.env.ONE_SIGNAL_APP_ID ? JSON.stringify(process.env.ONE_SIGNAL_APP_ID) : null,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]),
  resolve: {
    alias: {
      corporate: path.resolve(process.cwd(), 'corporate'),
      app: path.resolve(process.cwd(), 'app')
    },
    modules: [
      'app',
      'node_modules'
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: options.stats || false, // Don't show stats in the console
});
