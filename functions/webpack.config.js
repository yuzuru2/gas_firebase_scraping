const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  // ファイルの出力設定
  output: {
    path: `${__dirname}/`,
    filename: 'index.js',
    libraryTarget: 'this',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },

  externals: [nodeExternals()],
};
