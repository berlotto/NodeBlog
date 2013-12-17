'use strict';

/* Controllers */

(function(module) {
  module.controller('AdminPostEditCtrl', ['$scope', '$routeParams','$location',
    'blogService', 'adminBlogService', '$window',
    function($scope, $routeParams, $location, blogService, adminBlogService, $window) {
      console.log('Initializing AdminPostEditCtrl Controller');
      var postId = $routeParams.pid;
      var commentInsertKey = 'comments-inserted-' + postId;
      blogService.getPostDetails(postId).success(function(data, status, headers, config) {
        $scope.markDown = $window.marked;
        if(data && data.comments){
          for(var i = 0; i < data.comments.length; i++){
            data.comments[i].markedBody = marked(data.comments[i].body);
            if(data.comments[i].authorEmail){
              data.comments[i].authorEmailHash = hex_md5(data.comments[i].authorEmail);
            }
          }
        }
        $scope.post = data;
      }).error(function(data, status, headers, config) {
          alert(status + ',' +data);
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

})(window.app);