'use strict';

/* Controllers */

(function(module) {
  module.controller('AdminPostEditCtrl', ['$scope', '$routeParams','$location',
    'blogService', 'adminBlogService', '$window',
    function($scope, $routeParams, $location, blogService, adminBlogService, $window) {
      console.log('Initializing AdminPostEditCtrl Controller');
      var postId = $routeParams.pid;
      var COMMENT_INSERT_KEY = 'comments-inserted-' + postId;
      console.log('Edit post with id ' + postId);
      blogService.getPostDetails(postId).then(
          function(result) {
            $scope.markDown = $window.marked;
            if(result.data && result.data.comments){
              for(var i = 0; i < result.data.comments.length; i++){
                  result.data.comments[i].markedBody = marked(result.data.comments[i].body);
                if(result.data.comments[i].authorEmail){
                    result.data.comments[i].authorEmailHash = hex_md5(result.data.comments[i].authorEmail);
                }
              }
            }
            $scope.post = result.data;
          },
          function(result) {
            alert(result.status + ',' + result.data);
          });
      $scope.save = function(post){
        var jsonPost = JSON.stringify(post);
        var successCallback = function(result){
          console.log(result);
          //redirect to page details in view mode
          $location.path('/posts/' + post.urlLink);
        };
        if(post._id){
          adminBlogService.updatePost(post.urlLink, jsonPost).success(successCallback);
        }
        else{
          adminBlogService.addPost(jsonPost).success(successCallback);
        }
      };

    }]);

})(window.CtrlModule);