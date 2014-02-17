'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.factory('adminBlogService', ['$http', 'identity', function($http, identity){

    var addPost = function(post){
        //$http.default.transforResponse does it automatically
        //var jsonPost = JSON.stringify(post);
        return $http.post('/api/posts/', post, {
            transformRequest: [
                function(data, headersGetter) {
                    //var header = headersGetter();
                    data.createdOn = new Date();
                    data.updatedOn = null;
                    data.createdBy = identity.currentUser.name;
                    data.updatedBy = null;
                    return data;
                }
            ].concat($http.defaults.transformRequest)
        });
    };
    var updatePost = function(postId, post){
        return $http.put('/api/posts/' + postId, post, {
            transformRequest: [
                function(data, headersGetter) {
                    //var header = headersGetter();
                    data.updatedOn = new Date();
                    data.updatedBy = identity.currentUser.name;
                    return data;
                }
            ].concat($http.defaults.transformRequest)
        });
    };
    return {
      addPost: addPost,
      updatePost: updatePost
    }
  }]);
})(window.ServiceModule);