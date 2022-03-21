const {
  resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

/*
  tree shaking：去除无用代码
    前提：1. 必须使用ES6模块化  2. 开启production环境
    作用: 减少代码体积

    在package.json中配置
      "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
        问题：可能会把css / @babel/polyfill （副作用）文件干掉
        保留css文件和less文件
      "sideEffects": ["*.css", "*.less"]
*/

process.env.NODE_ENV = 'production';

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()],
    },
  },
];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        oneOf: [{
          test: /\.css$/,
          use: [...commonCssLoader],
        },
        {
          test: /\.less$/,
          use: [...commonCssLoader, 'less-loader'],
        },
        {
          test: /\.js/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3,
                  },
                  targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17',
                  },
                },

              ],
            ],
            cacheDirectory: true,
          },
        },
        {
          test: /\.(jpg|png|gif)/,
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            name: '[hash:10].[ext]',
            outputPath: 'imgs',
            esModule: false,
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          exclude: /\.(js|css|less|html|jpg|png|gif)/,
          loader: 'file-loader',
          options: {
            outputPath: 'media',
          },
        },
        ],
      }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css',
    }),
    new CssMinimizerWebpackPlugin(),

  ],
  mode: 'production',
};
