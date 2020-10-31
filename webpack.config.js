const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[hash].css'
})

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname) + '/static/',
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader', options: {
              url: false,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader', options: {
              sourceMap: true
            }
          }]
        })
      }
    ]
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      template: 'layouts/_default/baseof_template.html',
      filename: '../layouts/_default/baseof.html',
    }),
  ]
};
