import * as angular from 'angular';
import * as chai from 'chai';
import * as $ from 'jquery';

describe('Application Directive', function() {
    let $compile: angular.ICompileService;
    let $rootScope: angular.IRootScopeService;

    beforeEach(function() {
        angular.mock.module('movies-list-app');
    });

    beforeEach(angular.mock.inject(function(_$compile_: angular.ICompileService, _$rootScope_: angular.IRootScopeService){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the content', function() {
        let element = $compile("<app></app>")($rootScope);
        let $element = $(element.html());

        chai.expect($element.hasClass('ml-app-main-container'), 'There is no main container!').to.be.ok;
        chai.expect($element.find('search-input').length, 'There is no search input container').to.be.ok;
    });
});