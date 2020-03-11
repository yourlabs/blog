const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")

const extractSass = new ExtractTextPlugin({
    filename: 'index.css',
})

module.exports = {
  entry: './main.js',
  output: {
    filename: './js/bundle.js'
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader', options: {
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
            { family: 'Nunito', variants: [ '400', '700' ] }
        ]
    })
  ]
};
