'use strict';

/* Controllers */

(function(module) {
  module.controller('AdminPostsCtrl', ['$scope', '$routeParams', 'blogService',
    function($scope, $routeParams, blogService) {
      console.log('Initializing AdminPostsCtrl Controller');
      blogService.getPosts({from:$routeParams.from, to:$routeParams.to}, 20)
        .success(function(data, status, headers, config) {
          $scope.posts = data;
        }).
        error(function(data, status, headers, config) {
          $scope.posts = [];
          alert(status + ',' +data);
        });
    }]);
})(window.CtrlModule);