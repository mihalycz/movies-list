import * as angular from 'angular';
import app from './app.directive';
import searchInput from './components/search-input/search-input.directive';
import './app.view.less';

let appContainers = document.querySelectorAll('[data-movies-list]');
let appContainer = appContainers.length ? appContainers[0] : document.body;

appContainer.appendChild(document.createElement('app'));
angular.bootstrap(appContainer, [angular.module('movies-list-app', [searchInput]).directive('app', app).name]);