import * as angular from 'angular';
import { MoviesCache } from './movies-cache/movies-cache.service';
import { CurrentMovieCache } from './current-movie-cache/current-movie-cache.service';
import { FeedService } from './feed-service/feed.service';
import { CacheService } from './cache.service/cache.service';

export default angular.module('services', [])
    .service('cache', CacheService)
    .service('feed', FeedService)
    .service('currentMovieCache', CurrentMovieCache)
    .service('moviesCache', MoviesCache)
    .name;