const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');
const project = require('./project');

const config = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    'hadron-app-registry-redux-middleware': path.resolve(project.path.src, 'index.js')
  },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  },
  plugins: [
    // Use the generated hashes as module names
    new webpack.HashedModuleIdsPlugin(),

    // Scope hoist all modules into a single wrapper function to improve execution performance in the browser
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids.
    // This make ids predictable and reduces total file size.
    new webpack.optimize.OccurrenceOrderPlugin(),

    // Merge similar chunks if the total size is reduced enough to further optimize execution
    new webpack.optimize.AggressiveMergingPlugin(),

    // Minify and uglify the output code to reduce the bundle size further
    new UglifyJSPlugin({
      parallel: true // Enable parallelization. Default number of concurrent runs: os.cpus().length - 1.
    })
  ]
};

module.exports = merge.smart(baseWebpackConfig, config);
