'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.service('adminBlogService', ['$http', function($http){
    var deleteComment = function(commentId, postId){
      return $http.delete('comments/', {postId: postId, commentId: commentId});
    };
    var updateComment = function(commentId, postId){
      return $http.delete('comments/', {postId: postId, commentId: commentId});
    };
    var addPost = function(post){
      return $http.post('posts/', post);
    };
    var updatePost = function(postId, post){
      return $http.put('posts/' + postId, post);
    };
    return {
      deleteComment: deleteComment,
      updateComment: updateComment,
      addPost: addPost,
      updatePost: updatePost
    }
  }]);
})(window.ServiceModule);