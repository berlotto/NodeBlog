'use strict';

/* Controllers */
(function(module) {
module.controller('BlogSearchCtrl', ['$scope', '$location',
  function($scope, $location) {
    console.log('Initializing Blog Search Controller');

    $scope.search = function(keyword){
      console.log('Searching for ' + keyword);
      $location.path('/search/' + keyword)
    };
  }]);
})(CtrlModule);