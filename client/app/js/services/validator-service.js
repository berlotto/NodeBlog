'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('validatorService', ['$sce', 'moment', 'md5', function($sce, moment, md5){
      console.log('Initializing Validator Service');
      var isValidPositiveNumber = function(n){
          return true;
      };

      var isValidDateString = function(s){
         return true;
      }

      return {
         isValidPositiveNumber: isValidPositiveNumber,
         isValidDateString: isValidDateString
      }
   }]);
})(window.ServiceModule);