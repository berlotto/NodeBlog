'use strict';


// Declare app level module which depends on filters, and services
(function(module){
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'app/partials/posts.html', controller: 'BlogListCtrl'});
    $routeProvider.when('/posts/:pid', {templateUrl: 'app/partials/blogDetails.html', controller: 'BlogDetailsCtrl'});
    $routeProvider.when('/search', {templateUrl: 'app/partials/search.html', controller: 'BlogSearchCtrl'});
    $routeProvider.when('/searchResult/', {templateUrl: 'app/partials/searchResult.html', controller: 'BlogSearchResultCtrl'});
    $routeProvider.when('/admin', {templateUrl: 'admin/partials/taskList.html', controller: 'AdminTaskListCtrl'});
    $routeProvider.when('/admin/login', {templateUrl: 'admin/partials/login.html', controller: 'AdminLoginCtrl'});
    $routeProvider.when('/admin/posts', {templateUrl: 'admin/partials/posts.html', controller: 'AdminPostsCtrl'});
    $routeProvider.when('/admin/create', {templateUrl: 'admin/partials/create.html', controller: 'AdminPostCreateCtrl'});
    $routeProvider.when('/admin/posts/:pid', {templateUrl: 'admin/partials/edit.html', controller: 'AdminPostEditCtrl'});
    $routeProvider.when('/admin/comments', {templateUrl: 'admin/partials/comments.html', controller: 'AdminCommentsCtrl'});
    $routeProvider.when('/admin/tasks', {templateUrl: 'admin/partials/tasks.html', controller: 'AdminTasksCtrl'});
    $routeProvider.when('/admin/files', {templateUrl: 'admin/partials/files.html', controller: 'AdminFilesCtrl'});
    $routeProvider.when('/admin/pingBacks', {templateUrl: 'admin/partials/pingBacks.html', controller: 'AdminPingBacksCtrl'});
    $routeProvider.when('/admin/settings', {templateUrl: 'admin/partials/settings.html', controller: 'AdminSettingsCtrl'});

    $routeProvider.otherwise({redirectTo: '/'});
  }]);
  module.run(function($rootScope, $window) {
    $rootScope.r = $window.r;
  });
})(window.MainModule);