import { mock, ICompileService, IRootScopeService } from 'angular';
import { expect } from 'chai';
import * as $ from 'jquery';

describe('Application Directive', function() {
    let compile: ICompileService;
    let rootScope: IRootScopeService;

    beforeEach(function() {
        mock.module('movies-list-app');
    });

    beforeEach(mock.inject(function(_$compile_: ICompileService,
                                    _$rootScope_: IRootScopeService){
        compile = _$compile_;
        rootScope = _$rootScope_;
    }));

    it('Replaces the element with the content', function() {
        let element = compile("<app></app>")(rootScope);
        let innerHtml = $(element.html());
        expect(innerHtml.hasClass('ml-app-main-container'), 'There is no main container!').to.be.ok;
        expect(innerHtml.find('search-input').length, 'There is no search input container').to.be.ok;
    });
});