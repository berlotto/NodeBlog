'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.factory('authService', ['$http', function($http){
    var authenticate = function(userName, pwd){
        return $http.post('/api/authenticate', {username:userName, password: pwd});
    };
    var authorize = function(userName, pwd){
        return $http.post('/api/authorize', {username:userName, password: pwd});
    };
    var getLoggedIn = function(){
        return $http.get('/api/loggedIn');
    };

    return {
      authenticate: authenticate,
      authorize: authorize,
      getLoggedIn: getLoggedIn
    }
  }]);
})(window.ServiceModule);