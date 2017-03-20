import * as angular from 'angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as feed from '../feed-service/feed.service';
import { IMovieInfo, MovieInfo }  from '../movies-cache/movies-cache.service';

/**
 * Movie Cache Service Interface
 */
export interface ICurrentMovieCache {
    getMovie (imdbId: string):  angular.IPromise<feed.IFeedResult<IFullMovieInfo>>;
}

/**
 * Movie Full Info Item Interface
 */
export interface IFullMovieInfo extends IMovieInfo{
    released: moment.Moment;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    imdbRating: number;
    imdbVotes: number;
    type: string;
}

/**
 * Movie Full Info Item
 */
class FullMovieInfo extends MovieInfo implements IFullMovieInfo {
    released: moment.Moment;

    runtime: string;

    genre: string;

    director: string;

    writer: string;

    actors: string;

    plot: string;

    language: string;

    country: string;

    awards: string;

    imdbRating: number;

    imdbVotes: number;

    type: string;

    constructor(movie: Object) {
        super(movie);
        this.released = moment(_.get(movie, 'Released'), 'DD MMM YYYY');
        this.runtime = _.get<string>(movie, 'Runtime');
        this.genre = _.get<string>(movie, 'Genre');
        this.director = _.get<string>(movie, 'Director');
        this.writer = _.get<string>(movie, 'Writer');
        this.actors = _.get<string>(movie, 'Actors');
        this.plot = _.get<string>(movie, 'Plot');
        this.language = _.get<string>(movie, 'Language');
        this.country = _.get<string>(movie, 'Country');
        this.awards = _.get<string>(movie, 'Awards');
        this.imdbRating = _.get<number>(movie, 'imdbRating');
        this.imdbVotes =  _.get<number>(movie, 'imdbVotes');
        this.type = _.get<string>(movie, 'Type');
    }
}

/**
 * Movie Cache Service
 */
export class CurrentMovieCache implements ICurrentMovieCache {
    feedService: feed.IFeedService;

    constructor(feed: feed.IFeedService) {
        this.feedService = feed;
    }

    /**
     * Get feed data
     * @param {string} query - request string.
     * @param {number} page - result page number.
     * @return {IPromise<feed.IFeedResult<IFullMovieInfo>>} returns a promise to return list of movies and total movies count
     */
    getMovie (imdbId: string): angular.IPromise<feed.IFeedResult<IFullMovieInfo>> {
        return this.feedService.getData<IFullMovieInfo>({
            dataParser: this.parse,
            url: 'http://www.omdbapi.com/',
            query: { i: imdbId }
        });
    }

    /**
     * Response data parser
     * @param {Object} response - response object.
     * @return {IFeedResult<IFullMovieInfo>} returns full movie info wrapped in IFeedResult
     */
    parse(response: Object): feed.IFeedResult<IFullMovieInfo> {
        return {
            totalResults: 1,
            items: [new FullMovieInfo(_.get(response, 'data'))]
        }
    }
}

CurrentMovieCache.$inject = ['feed'];
