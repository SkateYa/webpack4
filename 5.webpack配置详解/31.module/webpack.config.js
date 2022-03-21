const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'[name].js',
        path:resolve(__dirname, 'build'),
    },
    module:{
      rules:[
         {
           test:/\.css$/,
           use:['style-loader','css-loader']
         },
         {
           test:/\.js$/,
           exclude:/node_modules/,
           include:resolve(__dirname,'src'),
           enforce:'pre',
           loader:'eslint-loader',
           options:{}
         },
         {
           oneOf:[]
         }
      ]
    },
    plugins:[
      new HtmlWebpackPlugin()
    ],
    mode:'development'
}