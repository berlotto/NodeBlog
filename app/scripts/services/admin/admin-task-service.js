'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.factory('adminTaskService', ['$http', function($http){
    var addTask = function(){
        return $http.get('/api/tasks');
    };
    var removeTask = function(id){
        return $http.delete('/api/tasks/' + id);
    };

    return {
      addTask: addTask,
      removeTask: removeTask
    }
  }]);
})(window.ServiceModule);