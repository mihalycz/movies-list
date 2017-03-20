import * as angular from 'angular';
import * as _ from 'lodash';
import * as feed from '../feed-service/feed.service';

/**
 * Movies Cache Service Interface
 */
export interface IMoviesCache {
    getMovies (query: string, page: number):  angular.IPromise<feed.IFeedResult<IMovieInfo>>;
}

/**
 * Movie Item Interface
 */
export interface IMovieInfo {
    title: string;
    year: number;
    poster: string;
    type: string;
    imdbId: string
}

/**
 * Movie Item
 */
export class MovieInfo implements IMovieInfo {
    title: string;
    year: number;
    poster: string;
    type: string;
    imdbId: string;

    constructor(movie: Object) {
        this.title = _.get<string>(movie, 'Title');
        this.year =  _.parseInt(_.get(movie, 'Year', '0'), 10);
        this.poster = _.get<string>(movie, 'Poster');
        this.type = _.get<string>(movie, 'Type');
        this.imdbId = _.get<string>(movie, 'imdbID');

        if (this.poster === 'N/A') {
            this.poster = require('../../styles/default-cover.jpg');
        }
    }
}

/**
 * Movies Cache Service
 */
export class MoviesCache implements IMoviesCache {
    feedService: feed.IFeedService;

    constructor(feed: feed.IFeedService) {
        this.feedService = feed;
    }

    /**
     * Get feed data
     * @param {string} query - request string.
     * @param {number} page - result page number.
     * @return {IPromise<feed.IFeedResult<IMovieInfo>>} returns a promise to return list of movies and total movies count
     */
    getMovies(query: string, page: number): angular.IPromise<feed.IFeedResult<IMovieInfo>> {
        return this.feedService.getData<IMovieInfo>({
            dataParser: this.parse,
            url: 'http://www.omdbapi.com/',
            query: { s: query, page: page }
        });
    }

    /**
     * Response data parser
     * @param {Object} response - response object.
     * @return {IFeedResult<IMovieInfo>} returns array of Movie Items and total items count
     */
    parse(response: Object): feed.IFeedResult<IMovieInfo> {
        let totalResults = _.get(response, 'data.totalResults', 0);
        let items = _.map(_.get(response, 'data.Search', []), (movie) => {
            return new MovieInfo(movie);
        });
        return {
            items: items,
            totalResults: totalResults
        }
    }
}

MoviesCache.$inject = ['feed'];
