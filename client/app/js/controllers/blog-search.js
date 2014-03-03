'use strict';

/* Controllers */
(function(module) {
    module.controller('BlogSearchCtrl', ['$scope', 'blogService',
        function($scope, $location, blogService) {
            console.log('Initializing Blog Search Controller');
            $scope.search = function(keyword){
                console.log('Searching for ' + keyword);
                blogService.search(keyword).then(function(posts){
                    $scope.searchResults = posts;
                });
            };
        }]);
})(CtrlModule);