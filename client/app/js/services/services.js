'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
    module.value('version', '0.1');
    module.service('blogService', ['$http', function($http){

    }]);
})(window.ServiceModule);