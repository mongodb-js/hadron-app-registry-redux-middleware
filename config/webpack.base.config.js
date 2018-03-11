const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const project = require('./project');

// Base Webpack configuration, used by all other configurations for common settings
module.exports = {
  output: {
    filename: '[name].js',
    path: project.path.output,
    library: project.library.name,
    libraryTarget: project.library.target
  },
  externals: [ nodeExternals() ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: [/node_modules/]
      }
    ]
  },
  plugins: [
    // Do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
