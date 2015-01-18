var webpack = require('webpack');

var join = require('path').join;
var rel = join.bind(null, __dirname);
var src = rel.bind(null, 'src');
var dist = rel.bind(null, 'dist');

var ROOT = rel();
var SRC = src();
var DIST = dist();

console.log(ROOT, SRC, DIST);

module.exports = {
  entry: ['webpack/hot/dev-server', src('index.js')],
  devtool: 'eval',
  devServer: {
    contentBase: SRC,
  },
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: '6to5-loader'},
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['bower_components', 'node_modules'],
    root: [ SRC ]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ],
  watch: true
};
