const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const devSetup = parts.devSetup();
const prodSetup = parts.prodSetup();
const testSetup = parts.testSetup();

const mainConfig = {
    context: __dirname,
    entry: {
        app:   './src/index.ts',
        index: './src/demo-page/index.ts'
    },
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: 'ts-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.html$/, loader: 'html-loader'},
        ]
    },
    output: {
        filename: "js/[name].bundle.js",
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js', '.json']
    }
};

module.exports = function(env) {
    switch (env) {
        case 'test':
            return merge(mainConfig, testSetup);
        case 'production':
            return merge(mainConfig, prodSetup);
        default:
            return merge(mainConfig, devSetup);
    }
};
