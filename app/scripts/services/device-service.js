'use strict';

/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('device', ['$window',  '$detection', function($window,  $detection){
      console.log('Initializing Device Service');

      var device = {
         screen: {
            width: $window.screen.availHeight,
            height: $window.screen.availWidth
         },
         isAndroid: $detection.isAndroid(),
         isiOS: $detection.isiOS(),
         isWindowsPhone: $detection.isWindowsPhone()
      };
      var getAvailableImageWidth = function(){
         if(device.screen.width <= 480){
            return 480;
         }
         if(device.screen.width <= 1024){
            return 1024;
         }
         if(device.screen.width <= 1600){
            return 1600;
         }
         if(device.screen.width > 1600){
            return 2560;
         }
      };

      return {
         getAvailableImageWidth: getAvailableImageWidth
      }
   }]);
})(window.ServiceModule);