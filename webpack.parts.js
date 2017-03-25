const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const WebpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devSetup = function() {
    return {
        output: {
            path: './dev',
        },
        module: {
            loaders: [
                { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!less-loader' })},
                { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff", options: {name: 'fonts/[hash].[ext]'} },
                { test: /\.ttf$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
                { test: /\.eot$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
                { test: /\.svg$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
                { test: /\.hbs$/, loader: "handlebars-loader" },
                { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file-loader", options: {name: 'images/[hash].[ext]'} }
            ]
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
              title: 'Movies List Test',
              template: './src/demo-page/index.hbs',
              filename: 'index.html'}),
            new ExtractTextPlugin({ filename: 'css/[name].styles.css', disable: false, allChunks: true })
        ],
        devtool: '#inline-source-map',
    };
};

exports.prodSetup = function() {
    return {
        module: {
            loaders: [
                { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!less-loader' })},
                { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff", options: {name: 'fonts/[hash].[ext]'} },
                { test: /\.ttf$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
                { test: /\.eot$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
                { test: /\.svg$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
                { test: /\.hbs$/, loader: "handlebars-loader" },
                { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file-loader", options: {name: 'images/[hash].[ext]'} }
            ]
        },
        plugins: [
            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions:  {
                    discardComments: {
                        removeAll: true,
                    },
                    safe: true,
                }
            }),
            new WebpackUglifyJsPlugin({
                cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
                debug: true,
                minimize: true,
                sourceMap: false,
                output: {
                    comments: false
                },
                compressor: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new HtmlWebpackPlugin({
                title: 'Movies List Prod',
                template: './src/demo-page/index.hbs',
                filename: 'index.html'
            }),
            new ExtractTextPlugin({ filename: 'css/[name].styles.css', disable: false, allChunks: true })
        ],
        output: {
            path: './build',
        },
    };
};

exports.testSetup = function () {
    return {
        module: {
            loaders: [
                { test: /\.less$/, loader: 'null-loader'},
                { test: /\.(woff|woff2)$/, loader: 'null-loader' },
                { test: /\.ttf$/, loader: "null-loader" },
                { test: /\.eot$/, loader: "null-loader" },
                { test: /\.svg$/, loader: "null-loader" },
                { test: /\.hbs$/, loader: "null-loader" },
                { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "null-loader" }
            ]
        }
    };
};