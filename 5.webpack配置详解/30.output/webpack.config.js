const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'[name].js',
        path:resolve(__dirname, 'build'),
        publicPath:'/',
        chunkFilename:'js/[name]_chunk.js',
        library:'[name]',
        libraryTarget:'global'
    },
    plugins:[
      new HtmlWebpackPlugin()
    ],
    mode:'development'
}