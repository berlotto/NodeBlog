/**
 * Created by jeffjin on 1/21/2014.
 */
'use strict';

/* Services */
/* This service will wrap AmplifyJS to store WIP data and restore accordingly */

(function(module){
    module.service('storage', ['$rootScope', function ($rootScope) {

        var set = function(key, value){
            amplify.store(key, value);
        };

        var get = function(key){
            return amplify.store(key);
        };


         return {
             get: get,
             set: set
         }
    }]);
})(window.ServiceModule);