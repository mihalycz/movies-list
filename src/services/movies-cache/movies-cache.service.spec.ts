import { IRootScopeService, IHttpBackendService, mock } from 'angular';
import { expect } from 'chai';
import { IMoviesCache } from './movies-cache.service';

export let movie1 = {
    Title: 'movie',
    Year: '2017',
    Poster: 'http://foo.bar/foo.jpg',
    Type: 'movie',
    imdbID: 'imdb1111'
};
export let movie2 = {
    Title: 'movie2',
    Year: '2017',
    Poster: 'http://foo.bar/foo2.jpg',
    Type: 'movie',
    imdbID: 'imdb1112'
};

let serverResponse1 = {
    Search: [movie1],
    totalResults: 1
};

let serverResponse2 = {
    Search: [movie2],
    totalResults: 1
};

describe('Movies Cache Service', function() {
    let moviesCache: IMoviesCache;
    let httpBackEnd: IHttpBackendService;
    let scope: IRootScopeService;

    beforeEach(function() {
        mock.module('services');
    });

    beforeEach(mock.inject(function(_$rootScope_: IRootScopeService,
                                    _$httpBackend_: IHttpBackendService,
                                    _moviesCache_: IMoviesCache){
        scope = _$rootScope_.$new();
        httpBackEnd = _$httpBackend_;
        moviesCache = _moviesCache_;
        httpBackEnd.whenJSONP('http://www.omdbapi.com/?page=1&s=foo&callback=JSON_CALLBACK').respond(serverResponse1);
        httpBackEnd.whenJSONP('http://www.omdbapi.com/?page=2&s=foo&callback=JSON_CALLBACK').respond(serverResponse2);
    }));

    it('Service has get data method', function() {
        expect(moviesCache.getMovies, 'There is no get data method!').to.be.ok;
    });

    it('Service has to return result', function() {
        moviesCache.getMovies('foo', 1).then((result) => {
            expect(result, 'Wrong get movies 1st page result!').to.be.ok;
            expect(result.items.length, 'No result Items!').to.be.ok;
            expect(result.totalResults, 'No totalResults value!').to.equal(1);
            let item = result.items[0];
            expect(item.title, 'IncorrectMovie Title value!').to.equal(movie1.Title);
            expect(item.year, 'IncorrectMovie Year value!').to.equal(parseInt(movie1.Year, 10));
            expect(item.poster, 'IncorrectMovie Poster value!').to.equal(movie1.Poster);
            expect(item.type, 'IncorrectMovie Type value!').to.equal(movie1.Type);
            expect(item.imdbId, 'IncorrectMovie imbdId value!').to.equal(movie1.imdbID);
        });

        moviesCache.getMovies('foo', 2).then((result) => {
            expect(result, 'Wrong get movies 2nd page result!').to.be.ok;
            expect(result.items.length, 'No result Items!').to.be.ok;
            expect(result.totalResults, 'No totalResults value!').to.equal(1);
            let item = result.items[0];
            expect(item.title, 'IncorrectMovie Title value!').to.equal(movie2.Title);
            expect(item.year, 'IncorrectMovie Year value!').to.equal(parseInt(movie2.Year, 10));
            expect(item.poster, 'IncorrectMovie Poster value!').to.equal(movie2.Poster);
            expect(item.type, 'IncorrectMovie Type value!').to.equal(movie2.Type);
            expect(item.imdbId, 'IncorrectMovie imbdId value!').to.equal(movie2.imdbID);
        });
        httpBackEnd.flush();
    });
});
