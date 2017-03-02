const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

exports.devSetup = function() {
    return {
        plugins: [
            new webpack.NamedModulesPlugin(),
        ],
        output: {
            path: './dev',
        },
        devtool: '#inline-source-map',
    };
};

exports.prodSetup = function() {
    return {
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
            new webpackUglifyJsPlugin({
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
            })
        ],
        output: {
            path: './build',
        },
    };
};

