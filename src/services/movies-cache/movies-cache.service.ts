import * as angular from 'angular';
import * as _ from 'lodash';
import * as feed from '../feed-service/feed.service';

/**
 * Movies Cache Service Interface
 */
export interface IMoviesCache {
    getMovies (query: string):  angular.IPromise<Array<IMovieInfo>>;
}

/**
 * Movie Item Interface
 */
export interface IMovieInfo {
    title: string;
    year: number;
    poster: string;
    type: string;
}

/**
 * Movie Item
 */
class MovieInfo implements IMovieInfo {
    title: string;
    year: number;
    poster: string;
    type: string;

    constructor(movie: Object) {
        this.title = _.get<string>(movie, 'Title');
        this.year =  _.parseInt(_.get(movie, 'Year', '0'), 10);
        this.poster = _.get<string>(movie, 'Poster');
        this.type = _.get<string>(movie, 'Type');

        if (this.poster === 'N/A') {
            this.poster = '';
        }
    }
}

/**
 * Movies Cache Service
 */
class MoviesCache implements IMoviesCache {
    feedService: feed.IFeedService;

    constructor(feed: feed.IFeedService) {
        this.feedService = feed;
    }

    /**
     * Get feed data
     * @param {string} query - request string.
     * @return {IPromise<Array<IMovieInfo>>} returns promise to return array of Movie Items
     */
    getMovies(query: string): angular.IPromise<Array<IMovieInfo>> {
        return this.feedService.getData<IMovieInfo>({
            dataParser: this.parse,
            url: 'http://www.omdbapi.com/',
            query: { s: query }
        });
    }

    /**
     * Response data parser
     * @param {Object} response - response object.
     * @return {Array<IMovieInfo>} returns array of Movie Items
     */
    parse(response: Object): Array<IMovieInfo> {
        return _.map(_.get(response, 'data.Search', []), (movie) => {
            return new MovieInfo(movie);
        })
    }
}

MoviesCache.$inject = ['feed'];

export default angular.module('services.movies-cache', [feed.default])
    .service('moviesCache', MoviesCache)
    .name;
