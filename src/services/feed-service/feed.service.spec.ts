import * as angular from 'angular';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as feed from './feed.service';

describe('Feed Service', function() {
    let feedService: feed.IFeedService;
    let http: angular.IHttpService;

    before(function() {

    });

    after(function() {

    });

    beforeEach(function() {
        angular.mock.module('services.feed');
    });

    beforeEach(angular.mock.inject(function(_feed_: feed.IFeedService, _$http_: angular.IHttpService){
        feedService = _feed_;
        http = _$http_;
    }));

    it('Service has get data method', function() {
        chai.expect(feedService.getData, 'There is no get data method!').to.be.ok;

        let jsonpStub = sinon.stub(http, "jsonp").yieldsTo("success", [1, 2, 3]);

        jsonpStub.restore();




    });
});

