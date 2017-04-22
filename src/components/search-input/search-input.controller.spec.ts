import {mock, ICompileService, IRootScopeService, IHttpBackendService, IControllerService} from 'angular';
import { expect } from 'chai';
import { spy } from 'sinon';
import { movie } from '../../services/current-movie-cache/current-movie-cache.service.spec';
import { movie1, movie2 } from '../../services/movies-cache/movies-cache.service.spec';

describe('Search Input Controller', function() {
    let compile: ICompileService;
    let scope: IRootScopeService;
    let controllerService: IControllerService;
    let httpBackEnd: IHttpBackendService;
    let controller;

    let serverResponse1 = {
        Search: [movie1],
        totalResults: 1
    };

    let serverResponse2 = {
        Search: [movie2],
        totalResults: 1
    };

    beforeEach(function() {
        mock.module('components.search-input');
    });

    beforeEach(mock.module('templates'));

    beforeEach(mock.inject(function(_$compile_: ICompileService,
                                    _$controller_: IControllerService,
                                _$rootScope_: IRootScopeService,
                                _$httpBackend_: IHttpBackendService,){
        controllerService = _$controller_;
        compile = _$compile_;
        scope = _$rootScope_.$new();
        httpBackEnd = _$httpBackend_;
        httpBackEnd.whenJSONP('http://www.omdbapi.com/?i=foo&callback=JSON_CALLBACK').respond(movie);
        httpBackEnd.whenJSONP('http://www.omdbapi.com/?page=1&s=foo&callback=JSON_CALLBACK').respond(serverResponse1);
        httpBackEnd.whenJSONP('http://www.omdbapi.com/?page=2&s=foo&callback=JSON_CALLBACK').respond(serverResponse2);
        controller = controllerService('SearchInputController', { $scope: scope });
        scope.context = controller;
    }));

    // todo: complete the tests
    it('Makes the search on search value change', function() {
        let onSearchChangeSpy = spy(controller, 'onSearchChange');
        let getMoviesSpy = spy(controller, 'getMovies');
        let onGetMoviesSuccessSpy = spy(controller, 'onGetMoviesSuccess');

        scope.searchValue = 'foo';
        scope.$digest();
        expect(scope.searchValue, 'search value does not equal input value').to.equal('foo');
        httpBackEnd.flush();

        expect(getMoviesSpy.called, 'getMoviesSpy was not called').to.be.ok;
        expect(onGetMoviesSuccessSpy.called, 'onGetMoviesSuccessSpy was not called').to.be.ok;
        expect(scope.selectedMovies.length, 'no movies returned!').to.be.equal(1);
        getMoviesSpy.restore();
        onGetMoviesSuccessSpy.restore();
        onSearchChangeSpy.restore();
    });
});
