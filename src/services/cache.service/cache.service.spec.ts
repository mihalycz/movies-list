import { mock } from 'angular';
import { expect } from 'chai';
import { spy } from 'sinon';
import { ICacheService } from './cache.service';

describe('Cache Service', function() {
    let cacheService: ICacheService;
    let resultToCache = {
        items: [],
        totalResults: 0
    };
    let cacheKey = {
        dataParser: (foo) => resultToCache,
        url: 'http://foo.bar',
        query: { foo: 'bar' }
    };

    beforeEach(function() {
        mock.module('services');
    });

    beforeEach(mock.inject(function(_cache_: ICacheService){
        cacheService = _cache_;
    }));

    it('Service has get data method', function() {
        expect(cacheService.getData, 'There is no get data method!').to.be.ok;
    });

    it('Service has set data method', function() {
        expect(cacheService.setData, 'There is no set data method!').to.be.ok;
    });

    it('Saves data to cache', function () {
        let setDataSpy = spy(cacheService, 'setData');
        let getDataSpy = spy(cacheService, 'getData');
        cacheService.setData(cacheKey, resultToCache);
        cacheService.getData(cacheKey).then((result) => {
            expect(result, 'Wrong Cached Result!').to.equal(resultToCache);
        });
        expect(setDataSpy.called, 'setData was not called').to.be.ok;
        expect(getDataSpy.called, 'getData was not called').to.be.ok;
        setDataSpy.restore();
        getDataSpy.restore();
    })
});


