import * as angular from 'angular';
import * as cache from '../cache.service/cache.service';

/**
 * Get feed parameters interface
 */
export interface IGetDataParameters<T> {
    dataParser: (response: Object) => Array<T>;
    url: string;
    query: Object;
}

/**
 * Feeds Service interface
 */
export interface IFeedService {
    getData<T> (parameters: IGetDataParameters<T>):  angular.IPromise<Array<T>>;
}

/**
 * Feeds Service
 */
class FeedService implements IFeedService {
    _q: angular.IQService;

    _http: angular.IHttpService;

    _sce: angular.ISCEService;

    cache: cache.ICacheService;

    constructor($q: angular.IQService,
                $http: angular.IHttpService,
                $sce: angular.ISCEService,
                cache: cache.ICacheService) {
        this._q = $q;
        this._http = $http;
        this._sce = $sce;
        this.cache = cache;
    }

    /**
     * Get feed data
     * @param {IGetDataParameters<*>} parameters - request parameters.
     * @return {IPromise<Array<*>>} returns promise to return typed array
     */
    getData<T>(parameters: IGetDataParameters<T>): angular.IPromise<Array<T>> {
        let deferred = this._q.defer();
        if (parameters.url) {
            this.cache.getData(parameters).then((result) => {
                if (result && result.length) {
                    deferred.resolve(result);
                } else {
                    let resource = this._sce.trustAsResourceUrl(parameters.url);
                    this._http.jsonp(resource, { params: parameters.query }).then(
                        this.onGetDataSuccess.bind(this, deferred, parameters),
                        this.onGetDataError.bind(this, deferred));
                }
            });
        } else {
            deferred.reject('incorrect url');
        }
        return deferred.promise;
    }

    /**
     * Handles successful request
     * @param {angular.IDeferred<Array<*>} deferred - promise to resolve.
     * @param {IGetDataParameters<*>} parameters - request parameters.
     * @param {Object} response - response data.
     * @return {void}
     */
    onGetDataSuccess<T> (deferred: angular.IDeferred<Array<T>>, parameters: IGetDataParameters<T>, response: Object): void {
        var responseData = parameters.dataParser(response);
        this.cache.setData(parameters, responseData);
        return deferred.resolve(responseData);
    }

    /**
     * Handles unsuccessful request
     * @param {angular.IDeferred<Array<*>} deferred - promise to resolve.
     * @return {void}
     */
    onGetDataError<T> (deferred: angular.IDeferred<Array<T>>): void {
        deferred.reject('get data error');
    }
}

FeedService.$inject = ['$q', '$http', '$sce', 'cache'];

export default angular.module('services.feed', [cache.default])
    .service('feed', FeedService)
    .name;

