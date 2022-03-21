const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/[name].js',
        path:resolve(__dirname, 'build'),
    },
    module:{
      rules:[
         {
           test:/\.css$/,
           use:['style-loader','css-loader']
         }
      ]
    },
    plugins:[
      new HtmlWebpackPlugin()
    ],
    mode:'development',
    resolve:{
      alias:{
        $css:resolve(__dirname,'src/css'),
        extensions:['.js','.json','.jsx','.css'],
        modules:[resolve(__dirname,'../../node_modules'),'node_modules']
      }
    }
}