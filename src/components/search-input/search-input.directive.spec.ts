import * as angular from 'angular';
import * as chai from 'chai';
import * as $ from 'jquery';

describe('Search Input Directive', function() {
    let $compile;
    let $rootScope;

    beforeEach(function() {
        angular.mock.module('components.search-input');
    });

    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the content', function() {
    });
});
