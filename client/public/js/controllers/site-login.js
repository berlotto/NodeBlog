'use strict';

/* Controllers */
(function (module) {
    console.log('Registering Site Login Controller');

    module.lazy.controller('SiteLoginCtrl', ['$scope', '$rootScope', '$location', 'authService',
        function ($scope, $rootScope, $location, authService) {
            console.log('Initializing Site Login Controller');

            $scope.login = function (username, password) {
                console.log('validating user name ' + username + ' with password ' + password);

                authService.authenticate(username, password).then(function (result) {
                    console.log('successful login for ' + result);
                    $rootScope.isLoggedIn = true;
                    $location.path('/admin');
                }, function (reason) {
                    console.log(reason.data);
                    $location.path('/login');
                });

            };
        }]);
})(window.app);