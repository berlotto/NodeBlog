'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.factory('adminBlogService', ['$http', function($http){
    var deleteComment = function(commentId, postId){
      return $http.delete('/api/comments/', {postId: postId, commentId: commentId});
    };
    var updateComment = function(commentId, postId){
      return $http.delete('/api/comments/', {postId: postId, commentId: commentId});
    };
    var addPost = function(post){
      return $http.post('/api/posts/', post);
    };
    var updatePost = function(postId, post){
      return $http.put('/api/posts/' + postId, post);
    };
    return {
      deleteComment: deleteComment,
      updateComment: updateComment,
      addPost: addPost,
      updatePost: updatePost
    }
  }]);
})(window.ServiceModule);