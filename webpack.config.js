const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './assets/js/index'
    ],

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./assets/bundles/'),
        //naming convention webpack should use for your files
        filename: '[name]-[hash].js',
        publicPath: 'http://localhost:3000/assets/bundles/',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    module: {
      rules: [
        {
          test: /\.jsx?$/, exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader?presets[]=react'
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['./node_modules'],
    }
};
