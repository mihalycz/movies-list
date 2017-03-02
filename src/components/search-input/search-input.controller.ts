import { IMoviesCache, IMovieInfo }  from '../../services/movies-cache/movies-cache.service';

export default class SearchInputController {

    searchValue: string;

    moviesCache: IMoviesCache;

    selectedMovies: Array<IMovieInfo>;

    constructor($scope, moviesCache: IMoviesCache) {
        this.moviesCache = moviesCache;
        $scope.$watch('context.searchValue', this.onSearchChange.bind(this));
    }

    onSearchChange (value: string) {
        this.moviesCache.getMovies(value).then((movies) => {
            this.selectedMovies = movies;
        });
    }
}

SearchInputController.$inject = ['$scope', 'moviesCache'];