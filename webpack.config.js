var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  cache: true,
  entry: {
    main:  './src/index.js'

  },
  output: {
    path: 'public/build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: ['react', 'es2015'] }}
    ]
  },
  plugins: [
    definePlugin,
    commonsPlugin
  ]
};
