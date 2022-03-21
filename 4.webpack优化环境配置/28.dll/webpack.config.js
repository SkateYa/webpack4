const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~(忽略一些文件)
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源(忽略的文件再次引入)
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
      // 解决index.html文件引入jquery路径多了‘auto/’，
      publicPath: '',
    }),
  ],
  mode: 'production',
};
