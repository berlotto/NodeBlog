'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('session', function(){
      var create = function (sessionId, userId, userRole) {
         this.currentUser = {
            id: sessionId,
            userId: userId,
            userRole: userRole
         };
         return this.currentUser;
      };
      var destroy = function () {
         this.currentUser = null;
      };
      return {
         create: create,
         destroy: destroy
      };
   });

})(window.ServiceModule);