'use strict';

/* Controllers */

(function(module) {
   module.controller('ImageListCtrl', ['$scope', 'device', '$routeParams',
      function($scope, device, $routeParams) {
         console.log('Initializing Image List Controller');
         $scope.imageWidth = device.getAvailableImageWidth();

      }]);
})(window.CtrlModule);