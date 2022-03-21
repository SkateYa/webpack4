# webpack-demo
webpack练习
下载后先执行：npm i webpack webpack-cli -D
打包命令：webpack
build文件 打包后生成的文件
启动命令：webpack serve

  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
    publicPath: "./" 
  },

  options:{
    name:'[hash:10].[ext]',
    outputPath:'media'    //打包后文件存放的文件夹
},

2.8 开发环境配置  webpack.config.js 内容比较全