/* eslint no-process-env: 0 no-console: 0 */
const webpack = require('webpack');
require('path');
const bourbon = require('node-bourbon').includePaths;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig(options) {
  // coerce to TRUE/FALSE so we can use later to determine whether it's a test
  // build or a minified build - options gets passed in via corresponding webpack
  // build files (e.g. - webpack.test.js) - NPM script commands trigger these
  const BUILD = !!options.BUILD;
  const TEST = !!options.TEST;
  const DEV_BUILD = options.BUILD && process.env.NODE_ENV === 'development';
  const QUICK_BUILD = process.env.QUICK_BUILD === 'true' || DEV_BUILD;

  console.log('BUILD?', BUILD);
  console.log('DEV_BUILD?', DEV_BUILD);
  console.log('QUICK_BUILD?', QUICK_BUILD);

  const config = {};
  config.context = `${__dirname}/app/client`;

  // making different entry points / outputs depending on if BUILD OR TEST mode
  if (!TEST) {
    config.entry = {
      client: './index.js',
      vendor: ['lodash']
    };
    config.output = {
      path: `${__dirname}/dist/public`,
      publicPath: '/',
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
      chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    };
  }

  // Type of sourcemap to use - http://webpack.github.io/docs/configuration.html#devtool
  if (TEST) {
    config.devtool = 'inline-source-map';
  } else if (BUILD) {
    config.devtool = QUICK_BUILD ? 'eval' : 'source-map';
  } else {
    config.devtool = 'eval';
  }

  config.resolve = {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  };

  config.module = {
    preLoaders: [],
    loaders: [
      {
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-runtime', 'transform-decorators-legacy']
        }
      },
      {
        test: /sinon\.js$/,
        loader: 'imports?define=>false,require=>false'
      },
      {
        include: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=1000000&mimetype=application/font-woff'
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=8192' },
      {
        // ASSET LOADER
        // Reference: https://github.com/webpack/file-loader
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader?limit=8192'
      },
      {
        // EJS LOADER
        // https://github.com/bazilio91/ejs-compiled-loader
        test: /\.ejs$/,
        loader: BUILD ? 'ejs-compiled?delimiter=$' : 'ejs-compiled' // Don't parse ejs if build
      },
      {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  };
  if (!BUILD || DEV_BUILD) {
    config.module.preLoaders.push({
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    });
  }

  // a bit of a hack to change CSS Loader based on TEST / BUILD flags
  const cssLoader = {
    test: /\.(css|scss)$/,
  };
  if (!BUILD) {
    cssLoader.loaders = [
      'style?sourceMap',
      'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'resolve-url',
      `sass?includePaths[]=${bourbon}`
    ];
  } else {
    cssLoader.loader = ExtractTextPlugin.extract('style',
      `css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?includePaths[]=${bourbon}`); // eslint-disable-line max-len
  }

  if (TEST) {
    cssLoader.loader = 'null';
  }

  config.module.loaders.push(cssLoader);

  config.plugins = [
    new ExtractTextPlugin('[name].[hash].css', {
      disable: !BUILD || TEST,
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    new webpack.DefinePlugin({
      __PRODUCTION__: BUILD && !DEV_BUILD,
      __API_HOST__: JSON.stringify(process.env.API_HOST),
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ];

  // Skip rendering index.ejs in test mode
  if (!TEST) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        apiHost: process.env.API_HOST,
        environment: 'development',
        template: './index.ejs',
        filename: `index${BUILD ? '.ejs' : '.html'}`,
        inject: 'body'
      })
    );
  }

  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './dist/public',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  return config;
};
