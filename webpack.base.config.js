var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');


module.exports = {
  context: __dirname,

  entry: './assets/js/index',

  output: {
    path: path.resolve('.assets/bundles/'),
    filename: '[name]-[hash].js',
  },

  plugins: [
  ],
  
  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: /node_modules/,
        use: [
          {loader: 'babel-loader?presets[]=react'}
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['./node_modules'],
  },
}
