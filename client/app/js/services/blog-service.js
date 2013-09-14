'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.service('blogService', ['$http', function($http){
    var getList = function(dateRange, size){
        return $http.get('posts');
    };
    var getDetails = function(id){
        return $http.get('posts/' + id);
    };
    var addComment = function(comment, postId){
        return $http.post('comments/', {postId: postId, comment: comment});
    };
    var savePost = function(post){
      //TODO: check id to decide post or put
        return $http.post('posts/', post);
    };
    return {
      getPosts: getList,
      savePost: savePost,
      getPostDetails: getDetails,
      addComment: addComment
    }
  }]);
})(window.ServiceModule);