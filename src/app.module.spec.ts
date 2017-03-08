import * as chai from 'chai';
import * as sinon from 'sinon';
import * as $ from 'jquery';
import * as angular from 'angular';
import AppRunner from './app.module';

describe('application runner module', function() {
    it('has to create the app in the body (no element with [data-movies-list] attribute)', function () {
        AppRunner.setupAppContainer ();
        chai.expect(AppRunner.appContainer, 'No app container found!').to.be.ok;
        chai.expect(AppRunner.appContainer, 'App container is not the body!').equal(document.body);
    });

    it('has to create the app in the container (element with [data-movies-list] attribute)', function () {
        let attribute;
        let attributeName = 'data-movies-list';

        $(document.body).html(`<div ${attributeName}></div>`);
        AppRunner.setupAppContainer ();
        chai.expect(AppRunner.appContainer, 'No app container found!').to.be.ok;
        chai.expect(AppRunner.appContainer.hasAttribute(attributeName), 'No [data-movies-list] attribute found!').to.be.true;
    });

    it('has to setup container and run app initialization', function () {
        let setupAppContainerSpy = sinon.spy(AppRunner, "setupAppContainer");
        let createAppSpy = sinon.stub(AppRunner, "createApp");
        AppRunner.run();
        chai.expect(setupAppContainerSpy.calledOnce).to.be.true;
        chai.expect(createAppSpy.calledOnce).to.be.true;
        setupAppContainerSpy.restore();
        createAppSpy.restore();
    });

    it('has to bootstrap angular application', function () {
        let bootstrapStub = sinon.stub(angular, 'bootstrap');
        AppRunner.run();
        chai.expect(bootstrapStub.calledOnce).to.be.true;
        bootstrapStub.restore();
    });
});