'use strict';

/* Controllers */

(function(module) {
  module.controller('BlogDetailsCtrl', ['$scope', '$routeParams', 'blogService', '$window',
    function($scope, $routeParams, blogService, $window) {
    console.log('Initializing Blog Details Controller');
    var postId = $routeParams.pid;
    console.log('Searching for ' + postId);
    blogService.getPostDetails(postId).success(function(data, status, headers, config) {
      $scope.post = data;
    }).error(function(data, status, headers, config) {
      alert(status + ',' +data);
    });
  }]);
})(window.CtrlModule);