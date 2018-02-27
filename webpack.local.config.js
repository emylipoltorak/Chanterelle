var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var config = require('./webpack.base.config.js');

config.entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './assets/js/index'
]

config.output.publicPath = 'http://localhost:3000/assets/bundles'


config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
])


module.exports = config
