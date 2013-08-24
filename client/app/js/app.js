'use strict';


// Declare app level module which depends on filters, and services
(function(module){
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/taskList.html', controller: 'BlogListCtrl'});
    $routeProvider.when('/posts/:pid', {templateUrl: 'partials/blogDetails.html', controller: 'BlogDetailsCtrl'});
    $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: 'BlogSearchCtrl'});
    $routeProvider.when('/admin', {templateUrl: 'partials/admin/taskList.html', controller: 'AdminTaskListCtrl'});
    $routeProvider.when('/admin/login', {templateUrl: 'partials/admin/login.html', controller: 'AdminLoginCtrl'});
    $routeProvider.when('/admin/posts', {templateUrl: 'partials/admin/posts.html', controller: 'AdminPostsCtrl'});
    $routeProvider.when('/admin/create', {templateUrl: 'partials/admin/create.html', controller: 'AdminPostCreateCtrl'});
    $routeProvider.when('/admin/edit/:postId', {templateUrl: 'partials/admin/edit.html', controller: 'AdminPostEditCtrl'});
    $routeProvider.when('/admin/comments', {templateUrl: 'partials/admin/comments.html', controller: 'AdminCommentsCtrl'});
    $routeProvider.when('/admin/settings', {templateUrl: 'partials/admin/settings.html', controller: 'AdminSettingsCtrl'});

    $routeProvider.otherwise({redirectTo: '/'});
  }]);
  module.run(function($rootScope, $window) {
    $rootScope.r = $window.r;
  });
})(window.MainModule);