'use strict';

// General settings service
(function (module) {
    module.service('settingsService', ['$http', function ($http) {
        var getSettings = function () {
            return $http.get('settings/');
        };
        var updateSettings = function (settings) {
            return $http.put('settings/', settings);
        };

        return {
            getSettings: getSettings,
            updateSettings: updateSettings
        }
    }]);
})(window.app);