'use strict';

/* Controllers */
(function(module) {
module.controller('SiteLoginCtrl', ['$scope', '$location', 'authService',
  function($scope, $location, authService) {
    console.log('Initializing Site Login Controller');

    $scope.login = function(uname, pwd){
      console.log('validating user name ' + uname + ' with password ' + pwd);

      authService.authenticate(uname, pwd).then(function(result){
          console.log('success for ' + result);
          $location.path('/admin');
      }, function(reason){
          alert(reason.data);
          $location.path('/login');
      });

    };
  }]);
})(CtrlModule);