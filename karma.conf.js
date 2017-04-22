const webpackConfig = require('./webpack.config.js')('test');
const merge = require('webpack-merge');

module.exports=function(config) {
    config.set({
        preprocessors: {
            'src/**/*.ts': ['webpack'],
            'src/**/*.html': ['ng-html2js'],
            'src/**/!(*.mock|*.spec).js': ['coverage']
        },
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.html',
            'src/**/*.ts',
        ],
        reporters: ['mocha', 'progress', 'coverage'],
        frameworks: ['mocha', 'chai', 'sinon'],
        webpack: webpackConfig,
        mime: {
            'text/x-typescript': ['ts','tsx']
        },

        browsers: ['PhantomJS'],
        logLevel: config.LOG_DEBUG,
        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'templates'
        },
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
    });
};
