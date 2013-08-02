'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.service('blogService', ['$http', function($http){
    var getList = function(dateRange, size){
        return $http.get('/blogs');
    };
    var getDetails = function(id){
        return $http.get('/blogs/' + id);
    };
    return {
      getPosts: getList,
      getPostDetails: getDetails
    }
  }]);
})(window.ServiceModule);