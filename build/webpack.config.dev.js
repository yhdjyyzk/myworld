var path = require('path')
var webpack = require('webpack')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopywebpackPlugin = require('copy-webpack-plugin')

const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = 'Build/Cesium/Workers'

module.exports = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: './src/index.js',
  output: {
    sourcePrefix: '',
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/../myworld'),
    publicPath: '/' // 必须配置
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
        test: /\.(png|jpg|jpeg|gif)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/',
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].min.[ext]',
            limit: 5000,
            publicPath: 'fonts/',
            utputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // eslint-disable-next-line new-cap
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify('')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.ProgressPlugin(function (percentage, message, ...args) {
      //   console.info(message + (percentage * 100).toFixed(2) + '%' + '. ' + args.join(','))
    }),
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
    new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }])
  ],
  resolve: {
    extensions: ['.js', '.jsx', 'ts', 'tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      cesium: path.resolve(__dirname, '../', cesiumSource)
    }
  },
  devServer: {
    inline: true,
    hot: true,
    port: 8888,
    historyApiFallback: {
      index: '/index.html'
    }, // react router要配置
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
