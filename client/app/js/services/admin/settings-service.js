'use strict';

// General settings service
(function(module){
  module.service('settingsService', ['$http', function($http){
    var getSettings = function(){
        return $http.get('/api/settings/');
    };
    var updateSettings = function(settings){
        return $http.put('/api/settings/', settings);
    };

    return {
      getSettings: getSettings,
      updateSettings: updateSettings
    }
  }]);
})(window.ServiceModule);