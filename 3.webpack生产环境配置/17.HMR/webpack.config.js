const {
  resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// process.env.NODE_ENV = 'production';

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
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
    publicPath: './',
  },
  module: {
    rules: [{
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
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        fix: true,
      },
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
      },
    },
    {
      test: /\.(jpg|png|gif)/,
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        name: '[hash:10].[ext]',
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
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',

    }),
    new MiniCssExtractPlugin({
      filename: 'built.css',
    }),
    new CssMinimizerWebpackPlugin(),

  ],
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
  mode: 'production',
};
