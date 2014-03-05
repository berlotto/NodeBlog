'use strict';

/* Controllers */
(function(module) {
    module.controller('BlogSearchCtrl', ['$scope', 'searchService',
        function($scope, searchService) {
            //console.log('Initializing Blog Search Controller');
            $scope.search = function(keyword){
                console.log('Searching for ' + keyword);
                return searchService.search(keyword).then(function(result){
                    $scope.searchResult = result;
                });
            };
        }]);
})(CtrlModule);