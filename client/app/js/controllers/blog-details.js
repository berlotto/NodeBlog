'use strict';

/* Controllers */

(function(module) {
  module.controller('BlogDetailsCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    console.log('Initializing Blog Details Controller');
    var postId = $routeParams.pid;
    console.log('Searching for ' + postId);

  }]);
})(window.CtrlModule);