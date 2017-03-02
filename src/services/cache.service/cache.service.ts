import * as angular from 'angular';
import * as feed from '../feed-service/feed.service';
import * as objectHash from 'object-hash';

/**
 * Feeds Service interface
 */
export interface ICacheService {
    getData<T> (parameters: feed.IGetDataParameters<T>):  angular.IPromise<Array<T>>;
    setData<T>(parameters: feed.IGetDataParameters<T>, data: Array<T>): void
}

/**
 * Feeds Service
 */
class CacheService implements ICacheService {
    _q: angular.IQService;

    cache: Object = {};

    constructor($q: angular.IQService) {
        this._q = $q;
    }

    /**
     * Get cached data
     * @param {IGetDataParameters<*>} parameters - request parameters.
     * @return {IPromise<Array<*>>} returns promise to return typed array
     */
    getData<T>(parameters: feed.IGetDataParameters<T>): angular.IPromise<Array<T>> {
        let deferred = this._q.defer();
        let hash = objectHash.sha1(parameters);
        deferred.resolve(this.cache[hash]);
        return deferred.promise;
    }

    /**
     * Get cached data
     * @param {IGetDataParameters<*>} parameters - request parameters.
     * @param {Array<T>} data - data to set.
     */
    setData<T>(parameters: feed.IGetDataParameters<T>, data: Array<T>): void {
        var hash = objectHash.sha1(parameters);
        this.cache[hash] = data;
    }

}

CacheService.$inject = ['$q'];

export default angular.module('services.cache', [])
    .service('cache', CacheService)
    .name;
