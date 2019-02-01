const webpack = require('webpack');
const merge = require('webpack-merge');

const { NamedChunksPlugin } = require('./webpack-plugins');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: `${__dirname}/../dist`,
        filename: '[name].[chunkhash].etools-admin.js'
    },
    plugins: [
        new webpack.ProgressPlugin({ profile: true }),
        NamedChunksPlugin,
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
    ],
    profile: true
});
