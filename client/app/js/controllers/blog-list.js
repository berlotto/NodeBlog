'use strict';

/* Controllers */

(function(module) {
   module.controller('BlogListCtrl', ['$scope', 'blogService', '$routeParams',
      function($scope, blogService, $routeParams) {
         console.log('Initializing Blog List Controller');
         return blogService.getList({from:$routeParams.from, to:$routeParams.to}, 20)
            .success(function(data) {
               $scope.posts = data;
            }).error(function(data, status) {
               console.error(status + ',' +data);
               $scope.posts = [];
            });

      }]);
})(window.CtrlModule);