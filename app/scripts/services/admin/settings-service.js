'use strict';

// General settings service
(function(module){
  module.service('settingsService', ['$http', 'identity', function($http, identity){
    var getSettings = function(){
        return $http.get('/api/settings/');
    };
    var updateSettings = function(settings){
        return $http.put('/api/settings/', settings, {
            transformRequest: [
                function(data, headersGetter) {
                    var header = headersGetter();
                    data.updatedOn = new Date();
                    data.updatedBy = identity.currentUser.name;
                }
            ].concat($http.defaults.transformRequest)
        });
    };

    return {
      getSettings: getSettings,
      updateSettings: updateSettings
    }
  }]);
})(window.ServiceModule);