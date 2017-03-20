import 'angular-lazyload';
import * as angular from 'angular';
import SearchInputController from './search-input.controller';
import services from '../../services/services.module';
import './search-input.view.less';

function searchInput() {
    return {
        restrict: 'E',
        template: require('./search-input.view.html'),
        controller: 'SearchInputController',
        controllerAs: 'context'
    }
}

export default angular.module('components.search-input', ['lazyload', services])
    .controller('SearchInputController', SearchInputController)
    .directive('searchInput', searchInput)
    .name;