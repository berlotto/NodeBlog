'use strict';

/* Controllers */

(function(module) {
  module.controller('AdminTaskListCtrl', ['$scope', '$rootScope', '$location', '$routeParams',
    function($scope, $rootScope, $location, $routeParams) {
      console.log('Initializing AdminTaskListCtrl Controller');
      if(!$rootScope.loggedInAs){
         $location.path('/login');
      }
  }]);
})(window.CtrlModule);