'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('session', ['storageService', function(storageService){
      var _user;
      var create = function (sessionId, userId, userRole) {
         _user = {
            id: sessionId,
            userId: userId,
            userRole: userRole,
            token: ''
         };
         storageService.set('user', _user);
         return _user;
      };
      var destroy = function () {
         storageService.set('user', null);
      };
      var currentUser = function(){
          return storageService.get('user') || _user;
      };

      var setAuthToken = function(token){
          _user.token = token;
      };

      return {
         currentUser: currentUser,
         create: create,
         destroy: destroy,
         setAuthToken: setAuthToken
      };
   }]);

})(window.ServiceModule);