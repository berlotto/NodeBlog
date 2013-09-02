'use strict';


// Declare app level module which depends on filters, and services
(function(module){
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/posts.html', controller: 'BlogListCtrl'});
    $routeProvider.when('/posts/:pid', {templateUrl: 'partials/blogDetails.html', controller: 'BlogDetailsCtrl'});
    $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: 'BlogSearchCtrl'});
    $routeProvider.when('/admin', {templateUrl: 'partials/admin/taskList.html', controller: 'AdminTaskListCtrl'});
    $routeProvider.when('/admin/login', {templateUrl: 'partials/admin/login.html', controller: 'AdminLoginCtrl'});
    $routeProvider.when('/admin/posts', {templateUrl: 'partials/admin/posts.html', controller: 'AdminPostsCtrl'});
    $routeProvider.when('/admin/create', {templateUrl: 'partials/admin/create.html', controller: 'AdminPostCreateCtrl'});
    $routeProvider.when('/admin/posts/:pid', {templateUrl: 'partials/admin/edit.html', controller: 'AdminPostEditCtrl'});
    $routeProvider.when('/admin/comments', {templateUrl: 'partials/admin/comments.html', controller: 'AdminCommentsCtrl'});
    $routeProvider.when('/admin/tasks', {templateUrl: 'partials/admin/tasks.html', controller: 'AdminTasksCtrl'});
    $routeProvider.when('/admin/files', {templateUrl: 'partials/admin/files.html', controller: 'AdminFilesCtrl'});
    $routeProvider.when('/admin/pingBacks', {templateUrl: 'partials/admin/pingBacks.html', controller: 'AdminPingBacksCtrl'});
    $routeProvider.when('/admin/settings', {templateUrl: 'partials/admin/settings.html', controller: 'AdminSettingsCtrl'});

    $routeProvider.otherwise({redirectTo: '/'});
  }]);
  module.run(function($rootScope, $window) {
    $rootScope.r = $window.r;
  });
})(window.MainModule);