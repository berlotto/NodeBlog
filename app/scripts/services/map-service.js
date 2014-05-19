'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('mapService', ['$http', '$q', function($http, $q){
      var saveMarkers = function(markers){

      };

      var saveAll = function(mapData){

      };

      return {
         saveMarkers: saveMarkers,
         saveAll: saveAll
      };
   }]);
})(window.ServiceModule);