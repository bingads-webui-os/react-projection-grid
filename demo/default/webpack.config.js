/* eslint-disable */

var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    './index.js',
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },
  devServer: {
    contentBase: './',
    port: 9000,
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'eslint-loader', exclude: [/node_modules/, /dist/] },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?publicPath=./dist/&limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?publicPath=./dist/&limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?publicPath=./dist/&limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  resolve: {
    alias: {
      'react-projection-grid': '../../dist/index',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    })
  ]
};
