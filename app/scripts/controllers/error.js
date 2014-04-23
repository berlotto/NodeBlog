'use strict';

/* Controllers */
(function(module) {
   module.controller('ErrorCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
      //console.log('Initializing Error Controller');
      $scope.headerText = 'error';
   }]);
})(window.CtrlModule);