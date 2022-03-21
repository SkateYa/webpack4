const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  // entry: {
  //     main:'./src/index.js',
  //     test:'./src/test.js'
  // },
  output: {
    filename: '[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
};
