const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // entry:'./src/index.js',
    // entry:['./src/index.js','./src/count.js'],
    entry:{
        index:['./src/index.js','./src/add.js'],
        count:'./src/count.js'
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname, 'build')
    },
    plugins:[
      new HtmlWebpackPlugin()
    ],
    mode:'development'
}