'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.service('authService', ['$http', function($http){
    var authenticate = function(userName, pwd){
        return $http.post('authenticate/', {uname:userName, pwd: pwd});
    };
    var authorize = function(userName, pwd){
        return $http.post('/authorize', {uname:userName, pwd: pwd});
    };

    return {
      authenticate: authenticate,
      authorize: authorize
    }
  }]);
})(window.ServiceModule);