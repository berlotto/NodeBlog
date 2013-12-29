'use strict';


// Declare app level module which depends on filters, and services
(function(module){
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'app/partials/posts.html', controller: 'BlogListCtrl'});
    $routeProvider.when('/login', {templateUrl: 'app/partials/login.html', controller: 'SiteLoginCtrl'});
    $routeProvider.when('/posts/:pid', {templateUrl: 'app/partials/blogDetails.html', controller: 'BlogDetailsCtrl'});
    $routeProvider.when('/search', {templateUrl: 'app/partials/search.html', controller: 'BlogSearchCtrl'});
    $routeProvider.when('/searchResult/', {templateUrl: 'app/partials/searchResult.html', controller: 'BlogSearchResultCtrl'});

    //admin routes
    $routeProvider.when('/admin', {templateUrl: 'app/partials/admin/taskList.html', controller: 'AdminTaskListCtrl'});
    $routeProvider.when('/admin/login', {templateUrl: 'app/partials/admin/login.html', controller: 'AdminLoginCtrl'});
    $routeProvider.when('/admin/posts', {templateUrl: 'app/partials/admin/posts.html', controller: 'AdminPostsCtrl'});
    $routeProvider.when('/admin/create', {templateUrl: 'app/partials/admin/create.html', controller: 'AdminPostCreateCtrl'});
    $routeProvider.when('/admin/posts/:pid', {templateUrl: 'app/partials/admin/edit.html', controller: 'AdminPostEditCtrl'});
    $routeProvider.when('/admin/comments', {templateUrl: 'app/partials/admin/comments.html', controller: 'AdminCommentsCtrl'});
    $routeProvider.when('/admin/tasks', {templateUrl: 'app/partials/admin/tasks.html', controller: 'AdminTasksCtrl'});
    $routeProvider.when('/admin/files', {templateUrl: 'app/partials/admin/files.html', controller: 'AdminFilesCtrl'});
    $routeProvider.when('/admin/pingBacks', {templateUrl: 'app/partials/admin/pingBacks.html', controller: 'AdminPingBacksCtrl'});
    $routeProvider.when('/admin/settings', {templateUrl: 'app/partials/admin/settings.html', controller: 'AdminSettingsCtrl'});

    //error routes
    $routeProvider.when('/404', {templateUrl: 'app/partials/error.html', controller: 'ErrorCtrl'});

    //default routes
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
  module.run(function($rootScope, $window) {
    $rootScope.r = $window.r;
  });
})(window.MainModule);