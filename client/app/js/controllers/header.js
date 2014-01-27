'use strict';

/* Controllers */
(function(module) {
module.controller('HeaderCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
     console.log('Initializing Header Controller');
     $scope.headerText = 'The law of the jungle';
  }]);
})(window.CtrlModule);