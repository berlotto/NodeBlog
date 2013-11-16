'use strict';

/* Controllers */
(function(module) {
module.controller('HeaderCtrl', ['$scope', '$rootScope', '$routeParams', '$location',
    function($scope, $rootScope, $routeParams, $location) {
     console.log('Initializing Header Controller');
     $scope.headerText = 'Law of the Jungle';
     $scope.logout = function(){
         console.log('logging out...');

     };
  }]);
})(window.CtrlModule);