/**
 * Created by Jeff Jin on 11/13/13.
 */

(function(module){
    module.factory('httpInterceptor', function ($q, $location) {
        return {
            // request method
            'request': function(config) {
                //console.log(' request method');

                return config || $q.when(config);
            },

            // request error method
            'requestError': function(rejection) {
                console.log(' request error method');

                return $q.reject(rejection);
            },

            // response method
            'response': function(response) {
                //console.log(' response method');

                return response || $q.when(response);
            },

            // response error method
            'responseError': function(rejection) {
                console.log(' response error method');
                if(rejection.status === 403){
                    //user not logged in, render login page
                    $location.path('/#!/login').replace();
                }
                else{
                    //do not have permission
                    $location.path('/404').replace();
                }
                return $q.reject(rejection);
            }
        };
    });
    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    });

})(window.ServiceModule);

