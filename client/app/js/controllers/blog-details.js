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

      $scope.addComment = function(cmt){
        var today = new Date();
        cmt.year = today.year;
        cmt.month = today.month;
        cmt.day = today.day;
        blogService.addComment(cmt, postId);
      };

      //initialize socket io
      var socket = $window.io.connect();
      console.log("initialize socket io => " + socket);
      //setup events for slave piece move
      socket.on("comments-inserted-" + postId, function(data){
        console.log("comments-inserted-" + postId  + ' => ' + data);
        $scope.post.comments.push(data);
      });

  }]);
})(window.CtrlModule);