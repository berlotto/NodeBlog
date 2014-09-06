'use strict';

(function(module) {
   module.controller('AppCtrl', ['$scope', 'authService', 'session', 'USER_ROLES',
      function($scope, authService, session, USER_ROLES) {
         $scope.currentUser = session.currentUser();
         $scope.userRoles = USER_ROLES;
         $scope.isAuthorized = authService.isAuthorized;
         $scope.themeIndex = new Date().getDate() % 6 + 1;
      }]);
})(window.CtrlModule);