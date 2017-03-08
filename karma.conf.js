const webpackConfig = require('./webpack.config.js')('test');
const merge = require('webpack-merge');

module.exports=function(config) {
    config.set({
        preprocessors: {
            'src/**/*.ts': ['webpack', 'sourcemap']
        },
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.ts',
        ],
        reporters: ['mocha', 'coverage'],
        frameworks: ['mocha', 'chai', 'sinon'],
        webpack: webpackConfig,
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        coverageReporter: {
            dir:'tmp/coverage/',
            reporters: [
                { type:'html', subdir: 'report-html' },
                { type:'lcov', subdir: 'report-lcov' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact:true }
            }
        },
        browsers: ['Chrome'],
        logLevel: config.LOG_DEBUG,
    });
};
