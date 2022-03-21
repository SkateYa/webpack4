const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'production',
  externals: {
    // 拒绝jQuery被打包进来
    jquery: 'jQuery',
  },
};
