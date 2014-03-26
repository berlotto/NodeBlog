'use strict';

/* Controllers */

(function(module) {
   module.controller('ImageDetailsCtrl', ['$scope', 'imageService', '$routeParams',
      function($scope, imageService, $routeParams) {
         console.log('Initializing Image Details Controller');
         imageService.getDetails($routeParams.name).then(function(img){
             $scope.image = img;
         });
      }]);
})(window.CtrlModule);