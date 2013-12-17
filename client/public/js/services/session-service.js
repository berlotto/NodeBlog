'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
    module.lazy.service('sessionService', ['$http', function ($http) {
        var logout = function () {
            return $http.post('/logout');
        };

        return {
            logout: logout
        }
    }]);
})(window.app);