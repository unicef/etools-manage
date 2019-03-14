/* eslint-disable */
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/'
  ],
  output: {
    filename: '[name].etools-admin.js',
  },

  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],

    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../test'),
      path.join(__dirname, '../node_modules')
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
              'react-hot-loader/babel',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
}
