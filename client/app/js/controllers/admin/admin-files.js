'use strict';

/* Controllers */

(function(module) {
  module.controller('AdminFilesCtrl', ['$scope', '$routeParams', 'fileService', 'authService',
    function($scope, $routeParams, fileService, authService) {
      console.log('Initializing AdminFilesCtrl Controller');
      fileService.list().then(function(result){
         $scope.files = result.data;
      });
    }]);
})(window.CtrlModule);