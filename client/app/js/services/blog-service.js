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
    return {
      getPosts: getList,
      getPostDetails: getDetails
    }
  }]);
})(window.ServiceModule);