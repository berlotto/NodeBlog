'use strict';

/* Controllers */
angular.module('sockeye', []).controller('FishCtrl', ['$scope', function($scope) {
   $scope.fishName = 'Sockeye';

}]);

angular.bootstrap($('#sockeye')[0], ['sockeye']);