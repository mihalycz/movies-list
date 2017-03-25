import { IQService, IHttpService, IRootScopeService, IHttpBackendService, mock } from 'angular';
import { expect } from 'chai';
import { stub } from 'sinon';
import { ICacheService } from '../cache.service/cache.service';
import { IFeedService } from './feed.service';

describe('Feed Service', function() {
    let httpBackEnd: IHttpBackendService;
    let scope: IRootScopeService;
    let qService: IQService;
    let feedService: IFeedService;
    let httpService: IHttpService;
    let cacheService: ICacheService;
    let resultToCache = {
        items: [],
        totalResults: 0
    };
    let cacheKey = {
        dataParser: (foo) => resultToCache,
        url: 'http://foo.bar',
        query: {}
    };

    beforeEach(function() {
        mock.module('services');
    });

    beforeEach(mock.inject(function(_$rootScope_: IRootScopeService,
                                    _$http_: IHttpService,
                                    _$httpBackend_: IHttpBackendService,
                                    _$q_: IQService,
                                    _cache_: ICacheService,
                                    _feed_: IFeedService,){
        scope = _$rootScope_.$new();
        cacheService = _cache_;
        feedService = _feed_;
        httpService = _$http_;
        qService = _$q_;
        httpBackEnd = _$httpBackend_;
        httpBackEnd.whenJSONP('http://foo.bar?callback=JSON_CALLBACK').respond(resultToCache);
    }));

    it('Service has get data method', function() {
        expect(feedService.getData, 'There is no get data method!').to.be.ok;
    });

    it('Service has to get data from cache', function () {
        let getCachedDataStub = stub(cacheService, 'getData');
        getCachedDataStub.withArgs(cacheKey).callsFake(() => {
            let deferred = qService.defer();
            deferred.resolve(resultToCache);
            return deferred.promise;
        });
        feedService.getData(cacheKey).then((result) => {
            expect(result, 'Wrong Cached Result!').to.equal(resultToCache);
        });
        scope.$apply();
        expect(getCachedDataStub.called, 'cache service getData was not called').to.be.ok;
        getCachedDataStub.restore();
    });

    it('Service has to get data from http', function () {
        feedService.getData(cacheKey).then((result) => {
            expect(result, 'Wrong http Result!').to.equal(resultToCache);
        });
        httpBackEnd.flush();
    });
});

