'use strict';

/* Controllers */

(function(module) {
  module.controller('BlogListCtrl', ['$scope', 'blogService', '$routeParams', '$rootScope',
    function($scope, blogService, $routeParams, $rootScope) {
    console.log('Initializing Blog List Controller');
    blogService.getPosts({from:$routeParams.from, to:$routeParams.to}, 20)
      .success(function(data, status, headers, config) {
        $scope.posts = data;
      }).
      error(function(data, status, headers, config) {
        alert(status + ',' +data);
      });

  }]);
})(window.CtrlModule);