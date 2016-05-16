require('dotenv').load()
var assert = require('assert')
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function id (x) { return x }

module.exports = function createWebpackConfig (env) {
  assert([
    'development',
    'test',
    'production'
  ].indexOf(env) !== -1, 'Invalid environment specified: ' + env)

  return {
    devtool: ({
      development: 'cheap-module-eval-source-map',
      test: 'inline-source-map'
    })[env],

    entry: ({
      development: [
        'webpack-hot-middleware/client',
        './client/index'
      ],
      production: {
        app: './client/index.js'
      }
    })[env],

    output: ({
      development: {
          filename: 'app.js',
          path: path.join(__dirname, 'dist'),
          publicPath: '/'
      },
      production: {
        filename: '[name].[hash].min.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
      }
    })[env],

    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify(env)
          },
          '__DEVTOOLS__': env === 'production' ? 'false' : JSON.stringify(JSON.parse(process.env.DEVTOOLS || 'false')),
          '__LOGGER__': env === 'production' ? 'false' : 'true',
          'API_URL': JSON.stringify(process.env.API_URL),
        }),
        env === 'development' && new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('[name].[hash].min.css', {
            allChunks: true,
            disable: env !== 'production'
        }),
        env === 'production' && new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          },
          sourceMap: false
        }),
        new HtmlWebpackPlugin({
            title: 'StudyKiK',
            filename: 'index.html',
            template: 'server/views/index.template.html'
        }),
        new HtmlWebpackPlugin({
            title: 'StudyKiK - Error',
            filename: '404.html',
            template: 'server/views/404.template.html'
        })
    ].filter(id),

    resolve: {
      modulesDirectories: [
        'shared',
        'node_modules'
      ],
      alias: {
        'constants$': __dirname + '/client/constants.js',
        utils: __dirname + '/client/utils',
        actions: __dirname + '/client/actions',
        effects: __dirname + '/client/effects',
      },
      root: path.resolve('./'),
    },

    module: {
      noParse: [ /moment.js/ ],
      loaders: [
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract(
            'style',
            env === 'production' ?
              'css!less' :
              'css?sourceMap!less?sourceMap'
          )
        }, {
          test: /\.js$/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            plugins: [ 'transform-decorators-legacy' ],
            presets: [ 'es2015', 'stage-0', 'react' ]
          },
          exclude: /node_modules/
        }, {
          test: /\.json$/,
          loader: 'json'
        }, {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }, {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            'style',
            env === 'production' ?
              'css!cssnext' :
              'css?sourceMap!cssnext?sourceMap'
          )
        }, {
          test: /\.png$/,
          loader: env === 'production' ?
            'url-loader?limit=10240' :
            'url-loader',
          query: {
            mimetype: 'image/png'
          }
        }
      ].filter(id)
    },

    cssnext: {
      browsers: 'last 2 versions'
    },

    watch: env === 'test'
  }
}
