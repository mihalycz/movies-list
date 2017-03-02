const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./webpack.parts');

const mainConfig = {
    context: __dirname,
    entry: {
        app: './src/app.module.ts',
        index: './src/tests/index.ts'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!less-loader' })},
            { test: /\.ts(x?)$/, loader: 'ts-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.html$/, loader: 'html-loader'},
            { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff", options: {name: 'fonts/[hash].[ext]'} },
            { test: /\.ttf$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
            { test: /\.eot$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
            { test: /\.svg$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
            { test: /\.hbs$/, loader: "handlebars-loader" },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file-loader", options: {name: 'images/[hash].[ext]'} }
        ]
    },
    output: {
        filename: "js/[name].bundle.js",
    },
    resolve: {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.tsx',
            '.ts',
            '.js',
            '.json',
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Movies List',
            template: './src/tests/index.hbs',
            filename: 'index.html'
        }),
        new ExtractTextPlugin({ filename: 'css/[name].styles.css', disable: false, allChunks: true })
    ]
};

const devSetup = parts.devSetup();

const prodSetup = parts.prodSetup();

module.exports = function(env) {
    if (env === 'production') {
        return merge(mainConfig, prodSetup);
    }
    return merge(mainConfig, devSetup);
};

