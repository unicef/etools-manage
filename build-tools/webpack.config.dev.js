// const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config');

const backendUrl = 'http://localhost:8080';

const proxy = {
    '/graphql': backendUrl,
};

module.exports = merge(config, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: '/dist/',
    },
    devServer: {
        contentBase: path.join(process.cwd(), 'dist'),
        port: 3000,
        historyApiFallback: true,
        inline: true,
        proxy
    },
    
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
});
