'use strict';

(function(module) {
   module.controller('AppCtrl', ['$scope', 'authService', 'USER_ROLES',
      function($scope, authService, USER_ROLES) {
         $scope.currentUser = null;
         $scope.userRoles = USER_ROLES;
         $scope.isAuthorized = authService.isAuthorized;
      }]);
})(window.CtrlModule);