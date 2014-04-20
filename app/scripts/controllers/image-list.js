'use strict';

/* Controllers */

(function(module) {
   module.controller('ImageListCtrl', ['$scope', 'imageService', '$routeParams',
      function($scope, imageService, $routeParams) {
         console.log('Initializing Image List Controller');
         return imageService.getList($routeParams.size || 20)
            .then(function(result) {
               $scope.images = result.data;
            }, function(data, status) {
               console.error(status + ',' +data);
               $scope.images = [];
            });

      }]);
})(window.CtrlModule);