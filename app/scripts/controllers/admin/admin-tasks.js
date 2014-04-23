'use strict';

/* Controllers */

(function(module) {
   module.controller('AdminTasksCtrl', ['$scope', '$routeParams', 'adminTaskService', 'authService',
      function($scope, $routeParams, adminTaskService, authService) {
         console.log('Initializing AdminTasksCtrl Controller');

      }]);
})(window.CtrlModule);