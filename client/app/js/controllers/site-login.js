'use strict';

/* Controllers */
(function(module) {
module.controller('SiteLoginCtrl', ['$scope', '$rootScope', '$location', 'authService',
  function($scope, $rootScope, $location, authService) {
    console.log('Initializing Site Login Controller');

    $scope.login = function(username, password){
      console.log('validating user name ' + username + ' with password ' + password);

      authService.authenticate(username, password).then(function(result){
          console.log('success for ' + result);
          console.log('loading all admin scripts...');
          $scope.loadFile('/admin/services/admin-blog-service.js', 'js');
          $scope.loadFile('/admin/services/admin-task-service.js', 'js');
          $scope.loadFile('/admin/services/file-service.js', 'js');
          $scope.loadFile('/admin/services/settings-service.js', 'js');
          //TODO: register services into chinook.service module

          $scope.loadFile('/admin/controllers/admin-task-list.js', 'js');
          $scope.loadFile('/admin/controllers/admin-comments.js', 'js');
          $scope.loadFile('/admin/controllers/admin-files.js', 'js');
          $scope.loadFile('/admin/controllers/admin-header.js', 'js');
          $scope.loadFile('/admin/controllers/admin-login.js', 'js');
          $scope.loadFile('/admin/controllers/admin-pingbacks.js', 'js');
          $scope.loadFile('/admin/controllers/admin-post-create.js', 'js');
          $scope.loadFile('/admin/controllers/admin-post-edit.js', 'js');
          $scope.loadFile('/admin/controllers/admin-posts.js', 'js');
          $scope.loadFile('/admin/controllers/admin-settings.js', 'js');
          $scope.loadFile('/admin/controllers/admin-tasks.js', 'js');
          //TODO: register controllers into chinook.controllers module

          $rootScope.isLoggedIn = true;
          $location.path('/admin');
      }, function(reason){
          console.log(reason.data);
          $location.path('/login');
      });

    };
  }]);
})(CtrlModule);