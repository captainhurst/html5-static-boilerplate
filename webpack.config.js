var webpack = require('webpack');
var rel = require('path').join.bind(null, __dirname);

/**
 * ROOT path - the projects root directory
 *
 * @type {absolute path}
 */
var ROOT = rel('.');

/**
 * SRC - the directory that contains all
 * of your source files which may be used
 * in the app
 *
 * @type {absolute path}
 */
var SRC = rel('src');

/**
 * DIST - the directory that will contain the
 * final, static version of the site
 *
 * @type {absolute path}
 */
var DIST = rel('dist');

/**
 * ENTRY - the main module file for your app. This
 * should import all other modules for your app.
 *
 * @type {relative path} - relative to ROOT
 */
var ENTRY = './src/index.js';

/**
 * webpack Config - for additional info see:
 * http://webpack.github.io/docs/configuration.html
 *
 * @type {Object}
 */
module.exports = {
  context: ROOT,
  entry: ENTRY,

  // debug bundle output makes debugging simpler
  devtool: 'eval',

  // rebuild when there are changes
  watch: true,

  // serve all files, not the bundle, out of SRC
  devServer: {
    hot: false,
    stats: {
      quiet: true,
      colors: true
    },
    watchDelay: 300,
    contentBase: SRC,
  },

  // serve the bundle as /bundle.js
  output: {
    path: DIST,
    filename: 'bundle.js'
  },

  // loader configs operate on files that are included in the bundle/imported
  module: {
    loaders: [

      // es6 modules
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: '6to5-loader'
      },

      // less styles
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },

  // extend the lookup logic to simplify import ids
  //
  // allows `import 'style/main.less'` from anywhere, imports `src/style/main.less`
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['bower_components', 'node_modules'],
    root: [ SRC ]
  },

  // utilize bower.json/main setting for bower_components
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]

};
