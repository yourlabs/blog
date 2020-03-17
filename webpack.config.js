const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")

const extractSass = new ExtractTextPlugin({
    filename: 'bundle.css',
})

module.exports = {
  entry: './main.js',
  output: {
    path: __dirname + '/themes/ybs/static',
    filename: 'bundle.js'
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
    new GoogleFontsPlugin({
        fonts: [
            { family: 'Open Sans', variants: [ '300', '400', '700' ] }
        ]
    }),
  ]
};
