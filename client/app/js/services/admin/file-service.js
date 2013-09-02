'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.service('fileService', ['$http', function($http){
    var upload = function(){
        return $http.post('files');
    };
    var download = function(id){
        return $http.get('files/' + id);
    };
    var remove = function(id){
        return $http.delete('files/' + id);
    };

    return {
      upload: upload,
      download: download,
      remove: remove
    }
  }]);
})(window.ServiceModule);