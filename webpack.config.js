const path = require('path')

module.exports = {
  mode: "development",
  // webpack requires an entry point where it starts to collect dependencies.
  // see https://webpack.js.org/concepts/entry-points/
  entry: "./src/index.js",

  // where to dump the compiled assets?
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // for some files we need some special handling. these can be defined here.
  module: {
    rules: [
      // transforms "binary" files into base64 urls and uses these instead of the url
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        use: [
          {
            // details: https://webpack.js.org/loaders/url-loader/
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}