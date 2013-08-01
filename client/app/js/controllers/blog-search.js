'use strict';

/* Controllers */
(function(module) {
module.controller('BlogSearchCtrl', ['$scope', function($scope) {
    console.log('Initializing Blog Search Controller');

    $scope.search = function(keyword){
      console.log('Searching for ' + keyword);
      return;
    };
  }]);
})(CtrlModule);