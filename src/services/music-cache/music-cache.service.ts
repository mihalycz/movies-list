import * as angular from 'angular';
import * as _ from 'lodash';
import * as feed from '../feed-service/feed.service';

/**
 * Music Cache Service Interface
 */
export interface IMusicCache {
    getMusicAlbums (query: string):  angular.IPromise<Array<IAlbumInfo>>;
}

/**
 * Music Album Item Interface
 */
export interface IAlbumInfo {
    title: string;
    year: number;
    cover: string;
}

/**
 * Music Album Item
 */
class AlbumInfo implements IAlbumInfo {
    title: string;
    year: number;
    cover: string;

    constructor(movie: Object) {
        this.title = _.get<string>(movie, 'Title');
        this.year =  _.parseInt(_.get(movie, 'Year', '0'), 10);
        this.cover = _.get<string>(movie, 'Poster');
    }
}

/**
 * Movies Cache Service
 */
class MusicCache implements IMusicCache {
    feedService: feed.IFeedService;

    constructor(feed: feed.IFeedService) {
        this.feedService = feed;
    }

    /**
     * Get feed data
     * @param {string} query - request string.
     * @return {IPromise<Array<IMovieInfo>>} returns promise to return array of Movie Items
     */
    getMusicAlbums(query: string): angular.IPromise<Array<IAlbumInfo>> {
        return this.feedService.getData<IAlbumInfo>({
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
    parse(response: Object): Array<IAlbumInfo> {
        return _.map(_.get(response, 'data.Search', []), (movie) => {
            return new AlbumInfo(movie);
        })
    }
}

export default angular.module('services.music-cache', [feed.default])
    .service('musicCache', MusicCache)
    .name;

