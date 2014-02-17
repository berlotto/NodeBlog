'use strict';

/* Controllers */
(function(module) {
module.controller('SiteLoginCtrl', ['$scope', '$rootScope', '$location', 'authService', 'identity',
  function($scope, $rootScope, $location, authService, identity) {
    console.log('Initializing Site Login Controller');

    $scope.login = function(username, password){
      console.log('validating user name ' + username + ' with password ' + password);

      authService.authenticate(username, password).then(function(result){
          console.log('success for ' + result);
          identity.currentUser = result.data;
          $location.path('/admin');
      }, function(reason){
          console.error(reason.data);
          $location.path('/login').replace();
      });

    };
  }]);
})(CtrlModule);