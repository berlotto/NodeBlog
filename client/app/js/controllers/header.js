'use strict';

/* Controllers */
(function (module) {
    module.controller('HeaderCtrl', ['$scope', '$location', 'sessionService',
        function ($scope, $location, sessionService) {
            console.log('Initializing Header Controller');
            $scope.headerText = 'Law of the Jungle';
            $scope.logout = function () {
                console.log('logging out...');
                sessionService.logout().then(function (url) {
                    console.log('successfully logged out!');
                    $location.path((url && url.data) ? url.data : '/');
                }, function () {
                    console.error('unable to connect to server and logout!');
                });
            };
        }]);
})(window.CtrlModule);