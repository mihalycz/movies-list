import { IRootScopeService, IHttpBackendService, mock } from 'angular';
import { expect } from 'chai';
import { ICurrentMovieCache } from './current-movie-cache.service';
import * as moment from 'moment';

export let movie = {
    Title: 'movie',
    Year: '2017',
    Poster: 'http://foo.bar/foo.jpg',
    Type: 'movie',
    imdbID: 'imdb1111',
    Released: '01 Jun 2001',
    Runtime: '7 min',
    Genre: 'action',
    Director: 'director',
    Writer: 'writer',
    Actors: 'actors',
    Plot: 'supa movie!',
    Language: 'english',
    Country: 'US',
    Awards: 'mega award',
    imdbRating: '10',
    imdbVotes: '7.777'
};

describe('Current Movie Cache Service', function() {
    let currentMovieCache: ICurrentMovieCache;
    let httpBackEnd: IHttpBackendService;
    let scope: IRootScopeService;

    beforeEach(function() {
        mock.module('services');
    });

    beforeEach(mock.inject(function(_$rootScope_: IRootScopeService,
                                    _$httpBackend_: IHttpBackendService,
                                    _currentMovieCache_: ICurrentMovieCache){
        scope = _$rootScope_.$new();
        httpBackEnd = _$httpBackend_;
        currentMovieCache = _currentMovieCache_;
        httpBackEnd.whenJSONP('http://www.omdbapi.com/?i=foo&callback=JSON_CALLBACK').respond(movie);
    }));

    it('Service has get data method', function() {
        expect(currentMovieCache.getMovie, 'There is no get data method!').to.be.ok;
    });

    it('Service has to return result', function() {
        currentMovieCache.getMovie('foo').then((result) => {
            expect(result, 'Wrong get movie result!').to.be.ok;
            expect(result.items.length, 'No result Items!').to.be.ok;
            expect(result.totalResults, 'No totalResults value!').to.equal(1);
            let item = result.items[0];
            expect(item.title, 'IncorrectMovie Title value!').to.equal(movie.Title);
            expect(item.year, 'IncorrectMovie Year value!').to.equal(parseInt(movie.Year, 10));
            expect(item.poster, 'IncorrectMovie Poster value!').to.equal(movie.Poster);
            expect(item.type, 'IncorrectMovie Type value!').to.equal(movie.Type);
            expect(item.imdbId, 'IncorrectMovie imbdId value!').to.equal(movie.imdbID);
            expect(item.released.toString(), 'IncorrectMovie Released value!').to.equal(moment(movie.Released, 'DD MMM YYYY').toString());
            expect(item.runtime, 'IncorrectMovie Runtime value!').to.equal(movie.Runtime);
            expect(item.genre, 'IncorrectMovie Genre value!').to.equal(movie.Genre);
            expect(item.director, 'IncorrectMovie Director value!').to.equal(movie.Director);
            expect(item.writer, 'IncorrectMovie Writer value!').to.equal(movie.Writer);
            expect(item.actors, 'IncorrectMovie Actors value!').to.equal(movie.Actors);
            expect(item.plot, 'IncorrectMovie Plot value!').to.equal(movie.Plot);
            expect(item.language, 'IncorrectMovie Language value!').to.equal(movie.Language);
            expect(item.country, 'IncorrectMovie Country value!').to.equal(movie.Country);
            expect(item.awards, 'IncorrectMovie Awards value!').to.equal(movie.Awards);
            expect(item.imdbVotes, 'IncorrectMovie imbdVotes value!').to.equal(parseFloat(movie.imdbVotes));
            expect(item.imdbRating, 'IncorrectMovie imdbRating value!').to.equal(parseFloat(movie.imdbRating));
        });
        httpBackEnd.flush();
    });
});

