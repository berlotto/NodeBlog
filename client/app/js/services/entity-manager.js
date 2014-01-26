/**
 * Created by jeffjin on 1/21/2014.
 */
'use strict';

/* Services */
/* This service will wrap AmplifyJS to store WIP data and restore accordingly */

(function(module){
    module.factory('entityManager', ['storage', function (storage) {

        //register and unregister entities to watch/unwatch
        //we need $scope to watch on an entity
        var register = function(key, entity, scope){

        };

        var unregister = function(key, scope){

        };


        //store data into persistent storage

        //retrieve data from persistent storage

        //watch on
    }]);
})(window.ServiceModule);
