'use strict';

/* Controllers */

(function(module) {
   module.controller('BlogDetailsCtrl', ['$scope', '$routeParams', 'blogService', 'commentService', 'socketService', 'identity',
      function($scope, $routeParams, blogService, commentService, socketService, identity) {
         //console.log('Initializing Blog Details Controller');
         var postId = $routeParams.pid;
         var commentInsertKey = 'comments-inserted-' + postId;

         $scope.addComment = function(cmt){
            commentService.save(cmt, postId).then(function(){
               //clear the comment form
               $scope.post.activeComment = {};
            });
         };

         $scope.editComment = function(cmt){
            $scope.editCmt = cmt;
         };

         $scope.updateComment = function(cmt){
            commentService.save(cmt, postId).then(function(){
               //clear the comment form
               $scope.editCmt = null;
            });
         };

         //setup events for slave piece move
         socketService.on(commentInsertKey, function(data){
            console.log(commentInsertKey,  data);
            commentService.parseOne(data);
            $scope.post.comments.push(data);
         });
         $scope.$on('$destroy', function () {
            socketService.removeListeners(commentInsertKey);
         });

         return blogService.getDetails(postId).success(function(result) {
            $scope.hasEditRight = identity.currentUser && (identity.currentUser.isAdmin || identity.currentUser.isOwner);
            $scope.post = result;
         }).error(function(data, status) {
            console.error(status + ',' +data);
            $scope.hasEditRight = false;
            $scope.post = {};
         });

      }]);
})(window.CtrlModule);