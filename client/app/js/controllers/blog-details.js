'use strict';

/* Controllers */

(function(module) {
  module.controller('BlogDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'blogService', 'socket',
    function($scope, $rootScope, $routeParams, blogService, socket) {
      console.log('Initializing Blog Details Controller');
      var postId = $routeParams.pid;
      var commentInsertKey = 'comments-inserted-' + postId;
      blogService.getPostDetails(postId).success(function(data, status, headers, config) {
        if(data && data.comments){
          for(var i = 0; i < data.comments.length; i++){
            var cmt = data.comments[i];
            cmt.markedBody = marked(cmt.body);
            cmt.dateString = moment(cmt.createdOn).format("dddd, MMMM Do YYYY, h:mm:ss a");
            if(cmt.authorEmail){
              cmt.authorEmailHash = hex_md5(data.comments[i].authorEmail);
            }
          }
        }
        $scope.hasEditRight = $rootScope.loggedInAs && ($rootScope.loggedInAs.isAdmin || $rootScope.loggedInAs.isOwner);
        $scope.post = data;
        $scope.post.markedBody = marked(data.body);
      }).error(function(data, status, headers, config) {
        console.error(status + ',' +data);
      });

      $scope.addComment = function(cmt){
        cmt.createdOn = new Date();
        cmt.updatedOn = null;
        blogService.saveComment(cmt, postId).then(function(){
          //clear the comment form
          $scope.post.activeComment.authorEmail = '';
          $scope.post.activeComment.authorName = '';
          $scope.post.activeComment.authorEmailHash = '';
          $scope.post.activeComment.blogUrl = '';
          $scope.post.activeComment.body = '';
        });
      };

      $scope.editComment = function(cmt){
          $scope.editCmt = cmt;
      };

      $scope.updateComment = function(cmt){
          cmt.updatedOn = new Date();
          blogService.saveComment(cmt, postId).then(function(){
              //clear the comment form
              $scope.editCmt = null;
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