'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.config(['$interpolateProvider',
      function($interpolateProvider) {
         $interpolateProvider.startSymbol('[[');
         $interpolateProvider.endSymbol(']]');
      }])
      .factory('commentParser', ['$interpolate',
         function($interpolate) {
            // a service to handle parsing
            return {
               parse: function(text, context) {
                  var template = $interpolate(text);
                  return template(context);
               }
            };
         }]);

})(window.ParserModule);