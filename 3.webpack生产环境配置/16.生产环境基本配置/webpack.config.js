/*
  webpack.config.js  webpack的配置文件
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
*/

// resolve用来拼接绝对路径的方法
const {
  resolve,
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';
/*
    css兼容性处理：postcss --> postcss-loader postcss-preset-env

    帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

    "browserslist": {
      // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ],
      // 生产环境：默认是看生产环境
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ]
    }
  */

// 复用loader
const commonCssLoader = [
  // 创建style标签，将样式放入
  // 'style-loader',
  // 这个loader取代style-loader。作用：提取js中的css成单独文件
  MiniCssExtractPlugin.loader,
  // 将css文件整合到js文件中
  'css-loader',
  {
    // 还需要在package.json中定义browserslist
    // 使用loader的默认配置
    // 'postcss-loader',
    // 修改loader的配置
    loader: 'postcss-loader',
    // 修改postcss-loader的配置
    options: {
      ident: 'postcss',
      // postcss的插件
      plugins: () => [require('postcss-preset-env')()],
    },
  },
];

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/index.js',
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      // use数组中loader执行顺序：从右到左，从下到上 依次执行
      // 创建style标签，将js中的样式资源插入进行，添加到head中生效
      use: [...commonCssLoader],
    },
    {
      test: /\.less$/,
      use: [...commonCssLoader, 'less-loader'],
    },
    /*
                正常来讲，一个文件只能被一个loader处理。
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                  先执行eslint 在执行babel
              */
    /*
                语法检查： eslint-loader  eslint
                  注意：只检查自己写的源代码，第三方的库是不用检查的
                  设置检查规则：
                    package.json中eslintConfig中设置~
                      "eslintConfig": {
                        "extends": "airbnb-base"
                      }
                    airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
              */
    {
      // 在package.json中eslintConfig --> airbnb
      test: /\.js/,
      exclude: /node_modules/,
      // 优先执行
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        // 自动修复eslint的错误
        fix: true,
      },
    },
    /*
                js兼容性处理：babel-loader @babel/core
                  1. 基本js兼容性处理 --> @babel/preset-env
                    问题：只能转换基本语法，如promise高级语法不能转换
                  2. 全部js兼容性处理 --> @babel/polyfill
                    问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
                  3. 需要做兼容性处理的就做：按需加载  --> core-js
              */
    {
      test: /\.js/,
      // 排除node_modules文件
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        // 预设：指示babel做怎么样的兼容性处理
        presets: [
          [
            '@babel/preset-env',
            {
              // 按需加载
              useBuiltIns: 'usage',
              // 指定core-js版本
              corejs: {
                version: 3,
              },
              // 指定兼容性做到哪个版本浏览器
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
      // 使用一个loader
      // 下载 url-loader file-loader
      loader: 'url-loader',
      options: {
        // 图片大小小于8kb，就会被base64处理
        // 优点: 减少请求数量（减轻服务器压力）
        // 缺点：图片体积会更大（文件请求速度更慢）
        limit: 8 * 1024,
        // 给图片进行重命名
        // [hash:10]取图片的hash的前10位
        // [ext]取文件原来扩展名
        name: '[hash:10].[ext]',
        outputPath: 'imgs',
        // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
        // 解析时会出问题：[object Module]
        // 解决：关闭url-loader的es6模块化，使用commonjs解析
        esModule: false,
      },
    },
    {
      test: /\.html$/,
      // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
      loader: 'html-loader',
    },
    {
      // 排除js|css|less|html|jpg|png|gif资源
      exclude: /\.(js|css|less|html|jpg|png|gif)/,
      loader: 'file-loader',
      options: {
        // 打包后文件存放的文件夹
        outputPath: 'media',
      },
    },
    ],
  },
  plugins: [
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    // css插件，对输出的css文件进行重命名
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    // 压缩css
    new CssMinimizerWebpackPlugin(),

  ],
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
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
  // 生产环境下会自动压缩js代码
  mode: 'production',
};
