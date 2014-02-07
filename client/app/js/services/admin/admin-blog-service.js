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
        post.createdOn = new Date();
        var jsonPost = JSON.stringify(post);
        return $http.post('/api/posts/', jsonPost);
    };
    var updatePost = function(postId, post){
        post.updatedOn = new Date();
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