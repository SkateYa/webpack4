/*
  HMR: hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
      极大提升构建速度

      样式文件：可以使用HMR功能：因为style-loader内部实现了~（hot: true）

      html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
        解决：修改entry入口，将html文件引入

      js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。（入口文件做不了）

        if (module.hot) {
        // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
        module.hot.accept('./print.js', function() {
            // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
            // 会执行后面的回调函数
            print();
        });
        }
   */

const {
  resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/index.html'],
  target: 'web',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  // webpack5需要配置
  // target: 'web',
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        name: '[hash:10]:[ext]',
        esModule: false,
        outputPath: 'imgs',
      },
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
      exclude: /\.(css|html|js|less|jpg|png|gif)/,
      loader: 'file-loader',
      options: {
        name: '[hash:10].[ext]',
        outputPath: 'css',
      },
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 5000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true,
  },
  mode: 'development',
};
