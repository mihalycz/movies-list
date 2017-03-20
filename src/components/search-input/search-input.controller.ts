import * as _ from 'lodash';
import { IMoviesCache, IMovieInfo }  from '../../services/movies-cache/movies-cache.service';
import { ICurrentMovieCache, IFullMovieInfo }  from '../../services/current-movie-cache/current-movie-cache.service';
import { IFeedResult} from '../../services/feed-service/feed.service';

export default class SearchInputController {

    scope: angular.IScope;

    searchValue: string;

    moviesCache: IMoviesCache;

    currentMovieCache: ICurrentMovieCache;

    pages: number;

    page: number;

    itemsPerPage: number = 10;

    isLoading: boolean;

    tempCache: Object;

    constructor($scope, moviesCache: IMoviesCache, currentMovieCache: ICurrentMovieCache) {
        this.scope = $scope;
        this.moviesCache = moviesCache;
        this.currentMovieCache = currentMovieCache;
        this.tempCache = {};
        this.scope.selectedMovies = [];
        this.scope.onMovieItemClick = this.onMovieItemClick.bind(this);
        this.scope.$watch('context.searchValue', _.debounce(this.onSearchChange.bind(this), 500));
        this.scope.$on('lazyLoading', this.onLazyLoading.bind(this));
    }

    onMovieItemClick (movie: IMovieInfo, index: number) {
        let cachedItem = _.get(this.tempCache, index);
        if (cachedItem) {
            this.scope.selectedMovies[index] = cachedItem;
            delete this.tempCache[index];
        } else {
            if (movie.imdbId) {
                this.getMovie (movie.imdbId, index);
            }
        }
    }

    onSearchChange (value: string) {
        this.page = 1;
        this.pages = 0;
        this.tempCache = {};
        this.scope.selectedMovies = [];
        this.scope.$apply();
        if (value) {
            this.getMovies (value);
        }
    }

    onLazyLoading () {
        if (!this.isLoading) {
            this.getMovies (this.searchValue);
        }
    }

    onGetMoviesSuccess (searchValue: string, result: IFeedResult<IMovieInfo>) {
        if (searchValue === this.searchValue) {
            if (this.page === 1) {
                this.pages = Math.floor(result.totalResults / this.itemsPerPage);
            }
            this.scope.selectedMovies = _.concat(this.scope.selectedMovies, result.items);
            this.page += 1;
            this.scope.$broadcast('lazyLoadingFinished');
            this.isLoading = false;
        }
    }

    onGetMovieSuccess (index: number, result: IFeedResult<IFullMovieInfo>) {
        let movie = _.get(result, 'items[0]');
        if (movie) {
            this.tempCache[index] = this.scope.selectedMovies[index];
            this.scope.selectedMovies[index] = movie;
        }
    }

    onGetMoviesError () {
        this.isLoading = false;
    }

    getMovie (imdbId: string, index: number) {
        this.currentMovieCache.getMovie(imdbId).then(this.onGetMovieSuccess.bind(this, index));
    }

    getMovies (value: string) {
        if (this.page === 1 || this.page <= this.pages) {
            this.isLoading = true;
            this.moviesCache.getMovies(value, this.page).then(this.onGetMoviesSuccess.bind(this, value));
        }
    }
}

SearchInputController.$inject = ['$scope', 'moviesCache', 'currentMovieCache'];