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
    devtool: 'cheap-eval-source-map',
    output: {
        publicPath: '/dist'
    },
    devServer: {
        contentBase: path.join(process.cwd(), 'dist'),
        port: 8080,
        // host: '0.0.0.0', // uncomment for docker run
        // disableHostCheck: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
        proxy
    }
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
});
