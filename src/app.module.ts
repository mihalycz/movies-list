import * as angular from 'angular';
import app from './app.directive';
import searchInput from './components/search-input/search-input.directive';
import './app.view.less';

export default class AppRunner {
    static appContainer;

    static run () {
        AppRunner.setupAppContainer();
        AppRunner.createApp();
    }

    static setupAppContainer () {
        let appContainers = document.querySelectorAll('[data-movies-list]');
        AppRunner.appContainer = appContainers.length ? appContainers[0] : document.body;
        AppRunner.appContainer.appendChild(document.createElement('app'));
    }

    static createApp () {
        if (AppRunner.appContainer) {
            angular.bootstrap(AppRunner.appContainer, [angular.module('movies-list-app', [searchInput]).directive('app', app).name]);
        }
    }
}