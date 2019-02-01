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
    alias: {
      vendor: path.resolve(process.cwd(), 'vendor')
    },
    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../test'),
      path.join(__dirname, '../node_modules')
    ],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // babelrc: false,
            // presets: [
            //   [
            //     '@babel/preset-env',
            //     { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
            //   ],
            //   '@babel/preset-typescript',
            //   '@babel/preset-react',
            // ],
            // plugins: [
            //   // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
            //   // ['@babel/plugin-proposal-decorators', { legacy: true }],
            //   ['@babel/plugin-proposal-class-properties', { loose: true }],
            //   'react-hot-loader/babel',
            // ],
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
}
