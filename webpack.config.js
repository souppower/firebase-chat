const path = require('path');
const webpack = require('webpack');

const srcDir = './src';
const distDir = './js';

module.exports = {
    entry: {
        app: `${srcDir}/main.ts`
    },
    output: {
        filename: `${distDir}/[name].bundle.js`
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.ts', '.js', '.html']
    },
    module: {
        loaders: [
            {test: /\.ts/, loader: 'ts'},
            {test: /\.html/, loader: 'html'}
        ],
    },
    plugins: [
    ],
    devServer: {
        historyApiFallback: true,
        publicPath: '/'
    }
};
