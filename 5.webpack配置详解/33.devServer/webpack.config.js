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
    },
    devServer:{
      contentBase:resolve(__dirname,'build'),
      watchContentBase:true,
      watchOptions:{
        ignored:/node_modules/
      },
      compress:true,
      port:5000,
      host:'localhost',
      open:true,
      clientLogLevel:'none',
      quiet:true,
      overlay:false,
      proxy:{
        '/api':'http://localhost:3000',
        pathRewrite:{
          '^api':''
        }
      }
    }
}