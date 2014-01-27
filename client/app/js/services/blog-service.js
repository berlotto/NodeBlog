'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.factory('blogService', ['$http', '$q', function($http, $q){
    var getList = function(dateRange, size){
        return $http.get('/api/posts');
    };
    var getDetails = function(id){
        var deferred = $q.defer();
        if(id === 'new' || !id){
            var newPost =  {topic: 'topic for the new post', urlLink: '', metaTitle: '', summary: 'please write a summary', disableComment: false, status: 'draft', body: 'new post content here'};
            deferred.resolve({data: newPost});
            return deferred.promise;
        }
        return $http.get('/api/posts/' + id);
    };
    var saveComment = function(comment, postId){
        if(!comment._id){
            return $http.put('/api/comments/', {postId: postId, comment: comment});
        }
        return $http.post('/api/comments/', {postId: postId, comment: comment});
    };
    var deletePost = function(postId){
        return $http.delete('/api/posts/', {postId: postId});
    };

    return {
      getPosts: getList,
      getPostDetails: getDetails,
      saveComment: saveComment,
      deletePost: deletePost
    }
  }]);
})(window.ServiceModule);