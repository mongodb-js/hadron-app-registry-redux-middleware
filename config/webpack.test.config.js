const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseWebpackConfig = require('./webpack.base.config');
const project = require('./project');

const config = {
  target: 'node', // webpack should compile node compatible code for tests
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        enforce: 'post', // Enforce as a post step so babel can do its compilation prior to instrumenting code
        exclude: [
          /config/,
          /node_modules/,
          /.*?(?=\.spec).*?\.js/,
          /.tmp/,
          /lib/
        ],
        include: project.path.src,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        }
      }
    ]
  }
};

module.exports = merge(baseWebpackConfig, config);
