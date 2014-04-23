'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('socketService', ['$rootScope', '$window', function ($rootScope, $window) {
      var socket = $window.io.connect();
      return {
         on: function (eventName, callback) {
            socket.on(eventName, function () {
               var args = arguments;
               $rootScope.$apply(function () {
                  callback.apply(socket, args);
               });
            });
         },
         emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
               var args = arguments;
               $rootScope.$apply(function () {
                  if (callback) {
                     callback.apply(socket, args);
                  }
               });
            });
         },
         removeListeners: function(eventName){
            socket.removeAllListeners(eventName);
         }
      };
   }]);
})(window.ServiceModule);