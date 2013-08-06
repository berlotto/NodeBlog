'use strict';

/* Controllers */

(function(module) {
  module.controller('BlogListCtrl', ['$scope', 'blogService', function($scope, blogService) {
    console.log('Initializing Blog List Controller');

    blogService.getPosts().success(function(data, status, headers, config) {
        $scope.posts = data;
      }).
      error(function(data, status, headers, config) {
        alert(status + ',' +data);
      });

  }]);
})(window.CtrlModule);