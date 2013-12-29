'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
    module.service('adminTaskService', ['$http', function ($http) {
        var addTask = function () {
            return $http.get('tasks');
        };
        var removeTask = function (id) {
            return $http.delete('tasks/' + id);
        };

        return {
            addTask: addTask,
            removeTask: removeTask
        }
    }]);
})(window.app);