// Important modules this config uses
require('dotenv').load();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OfflinePlugin = require('offline-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  // Minify optimize the JavaScript
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),

  // Minify and optimize the index.html
  new HtmlWebpackPlugin({
    filename: 'app.html',
    chunks: ['app'],
    template: 'app/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),

  // Minify and optimize the index.html
  new HtmlWebpackPlugin({
    filename: 'admin.html',
    chunks: ['admin'],
    template: 'admin/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),

  // Minify and optimize the index.html
  new HtmlWebpackPlugin({
    filename: 'corporate.html',
    chunks: ['corporate'],
    template: 'corporate/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),

  // Extract the CSS into a seperate file
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),

  // Put it in the end to capture all the HtmlWebpackPlugin's
  // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
  new OfflinePlugin({
    relativePaths: false,
    publicPath: '/',

    // No need to cache .htaccess. See http://mxs.is/googmp,
    // this is applied before any match in `caches` section
    excludes: ['.htaccess'],

    caches: {
      main: [':rest:'],

      // All chunks marked as `additional`, loaded after main section
      // and do not prevent SW to install. Change to `optional` if
      // do not want them to be preloaded at all (cached only when first loaded)
      additional: ['*.chunk.js'],
    },

    // Removes warning for about `additional` section usage
    safeToUseOptionalCaches: true,

    AppCache: false,
  }),
  // add webpack assets plugin so that cloudflare clear cache script can know what to clear
  new AssetsPlugin(),
];

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: {
    'app': [
      'babel-polyfill', // Necessary for browser usage
      path.join(process.cwd(), 'app/app.js'),
    ],
    'admin': [
      'babel-polyfill', // Necessary for browser usage
      path.join(process.cwd(), 'admin/app.js'),
    ],
    'corporate': [
      'babel-polyfill', // Necessary for browser usage
      path.join(process.cwd(), 'corporate/app.js'),
    ]
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
  },

  mode: 'production',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      })
    ]
  },

  // We use MiniCssExtractPlugin so we get a seperate CSS file instead
  // of the CSS being in the JS and injected as a style tag
  lessLoaders: [
  {
    loader: MiniCssExtractPlugin.loader,
  }, {
    loader: 'css-loader',
  }, {
    loader: 'less-loader',
  }
  ],

  plugins: plugins
});
