let webpack = require('webpack');
let HtmlWebPackPlugin = require('html-webpack-plugin');
let NpmInstallPlugin = require("npm-install-webpack2-plugin");
module.exports = {
  entry: "./App.js",
  watch:true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000
  },
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.json$/,
        use:'json-loader'
      },
      {
        test: /\.scss$/,
        use:[
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["src/css/scss","src/styles"],
              outputStyle: 'compressed'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new NpmInstallPlugin(),
    new HtmlWebPackPlugin(
      {
        template:'src/templates/main.html',
        inject:'head',
        cache:true,
        hash:true
      }
    ),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery' })
  ]
};