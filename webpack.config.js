const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: './assets/js/index.js',

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./assets/bundles/'),
        //naming convention webpack should use for your files
        filename: '[name]-[hash].js'
    },

    plugins: [
        //tells webpack where to store data about your bundles.
        new BundleTracker({filename: './webpack-stats.json'})
    ],

    module: {
      rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
      ]

    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    watch: true
};