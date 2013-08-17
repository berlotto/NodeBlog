'use strict';

/* Controllers */

(function(module) {
  module.controller('BlogDetailsCtrl', ['$scope', '$routeParams', 'blogService', 'socket',
    function($scope, $routeParams, blogService, socket) {
      console.log('Initializing Blog Details Controller');
      var postId = $routeParams.pid;
      var commentInsertKey = 'comments-inserted-' + postId;
      blogService.getPostDetails(postId).success(function(data, status, headers, config) {
        if(data && data.comments){
          for(var i = 0; i < data.comments.length; i++){
            if(data.comments[i].authorEmail){
              data.comments[i].authorEmailHash = hex_md5(data.comments[i].authorEmail);
            }
          }
        }
        $scope.post = data;
      }).error(function(data, status, headers, config) {
        alert(status + ',' +data);
      });

      $scope.addComment = function(cmt){
        var today = new Date();
        cmt.year = today.year;
        cmt.month = today.month;
        cmt.day = today.day;
        blogService.addComment(cmt, postId).then(function(){
          //clear the comment form
          $scope.post.activeComment.authorEmail = '';
          $scope.post.activeComment.authorName = '';
          $scope.post.activeComment.authorEmailHash = '';
          $scope.post.activeComment.blogUrl = '';
          $scope.post.activeComment.body = '';
        });
      };

      //setup events for slave piece move
      socket.on(commentInsertKey, function(data){
        console.log(commentInsertKey  + ' => ' + data);
        $scope.post.comments.push(data);
      });
      $scope.$on('$destroy', function () {
        socket.removeListeners(commentInsertKey);
      });
  }]);
})(window.CtrlModule);