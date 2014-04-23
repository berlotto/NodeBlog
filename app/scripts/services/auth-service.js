'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('authService', ['$http', 'session', function($http, session){
      var authenticate = function(userName, pwd){
         return $http.post('/api/authenticate', {username:userName, password: pwd})
            .then(function (res) {
               return session.create(res.id, res.userId, res.role);
            });
      };

      var authorize = function(userName, pwd){
         return $http.post('/api/authorize', {username:userName, password: pwd});
      };

      var getLoggedIn = function(){
         return $http.get('/api/loggedIn');
      };

      var isAuthenticated = function () {
         return !!session.userId;
      };

      var isAuthorized = function (authorizedRoles) {
         if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
         }
         return (this.isAuthenticated() &&
            authorizedRoles.indexOf(session.userRole) !== -1);
      };
      return {
         authenticate: authenticate,
         authorize: authorize,
         isAuthenticated: isAuthenticated,
         isAuthorized: isAuthorized,
         getLoggedIn: getLoggedIn
      };
   }]);

})(window.ServiceModule);