'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
define(['appModule'], function (module) {
    console.log('Registering Blog Service');

    module.lazy.service('blogService', ['$http', function ($http) {
        var getList = function(dateRange, size){
        return $http.get('posts');
    };
    var getDetails = function(id){
        return $http.get('posts/' + id);
    };
    var addComment = function(comment, postId){
        return $http.post('comments/', {postId: postId, comment: comment});
    };

    return {
      getPosts: getList,
      getPostDetails: getDetails,
      addComment: addComment
    }
  }]);
});