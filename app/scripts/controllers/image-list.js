'use strict';

/* Controllers */

(function(module) {
   module.controller('ImageListCtrl', ['$scope', 'imageService', '$routeParams',
      function($scope, imageService, $routeParams) {
         console.log('Initializing Image List Controller');
         $scope.images = [];

      }]);
})(window.CtrlModule);