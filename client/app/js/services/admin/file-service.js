'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.factory('fileService', ['$http', function($http){
    var upload = function(){
        return $http.post('files');
    };
    var download = function(id){
        return $http.get('files/' + id);
    };
    var remove = function(id){
        return $http.delete('files/' + id);
    };
    var list = function(){
        return $http.get('files/');
    };
    return {
      upload: upload,
      download: download,
      remove: remove,
      list: list
    }
  }]);
})(window.ServiceModule);