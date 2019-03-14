// const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config');
const webpack = require('webpack');
const backendUrl = 'http://localhost:8082';

const proxy = {
    '/graphql': backendUrl
};

module.exports = merge(config, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: '/dist'
    },
    devServer: {
        contentBase: path.join(process.cwd(), 'dist'),
        port: 8080,
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: true,
        inline: true,
        proxy
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
