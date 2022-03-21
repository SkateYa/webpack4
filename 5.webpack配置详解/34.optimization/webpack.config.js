const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  mode: 'development',
  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css'),
      extensions: ['.js', '.json', '.jsx', '.css'],
      modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 有效值为 `all`，`async` 和 `initial`
      minSize: 30 * 1024, // 生成 chunk 的最小体积（≈ 30kb)
      maxSize: 0, // 确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 5, // 最大的按需(异步)加载次数
      maxInitialRequests: 3, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
      automaticNameDelimiter: '~',
      name: 'true',
      cacheGroups: { // 配置提取模块的方案
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },

};
