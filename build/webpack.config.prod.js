var path = require('path')
var webpack = require('webpack')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopywebpackPlugin = require('copy-webpack-plugin')

const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/myworld'),
    publicPath: '/myworld'
  },
  amd: {
    // Enable webpack-friendly use of require in Cesium
    toUrlUndefined: true
  },
  node: {
    // Resolve node module use of fs
    fs: 'empty'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
          // "postcss-loader",
        ]
        // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader' })
      },
      {
        test: /\.(scss)$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/',
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].min.[ext]',
            limit: 5000,
            publicPath: 'fonts/',
            utputPath: 'fonts/'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // eslint-disable-next-line new-cap
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      CESIUM_BASE_URL: JSON.stringify('.')
    }),
    new webpack.ProgressPlugin(function (percentage, message, ...args) {
    //   console.info(message + (percentage * 100).toFixed(2) + '%' + '. ' + args.join(','))
    }),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: './Workers' }]),
    new CopywebpackPlugin([{ from: path.join('node_modules/cesium/Build/Cesium/ThirdParty', './'), to: './ThirdParty' }]),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: './Assets' }]),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: './Widgets' }])
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      cesium: path.resolve(cesiumSource)
    }
  }
}
