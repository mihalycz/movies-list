import * as angular from 'angular';
import SearchInputController from './search-input.controller';
import moviesCache from '../../services/movies-cache/movies-cache.service';
import './search-input.view.less';

function searchInput() {
    return {
        restrict: 'E',
        template: require('./search-input.view.html'),
        controller: 'SearchInputController',
        controllerAs: 'context'
    }
}

export default angular.module('components.search-input', [moviesCache])
    .controller('SearchInputController', SearchInputController)
    .directive('searchInput', searchInput)
    .name;