'use strict';

/* Controllers */
(function(module) {
   module.controller('LoginFormCtrl', ['$scope', '$rootScope', '$location', 'authService', 'AUTH_EVENTS',
      function($scope, $rootScope, $location, authService, AUTH_EVENTS) {
         $scope.credentials = {
            username: '',
            password: ''
         };
         $scope.login = function (credentials) {
            authService.authenticate(credentials.username, credentials.password).then(function (user) {
               $scope.currentUser = user;
               $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }, function () {
               $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
         };

         $scope.logout = function (currentUser) {
            authService.logout(currentUser.id).then(function () {
               $scope.currentUser = null;
               $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }, function () {
               $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
            });
         };
      }]);
})(window.CtrlModule);
