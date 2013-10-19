'use strict';


// Declare app level module which depends on filters, and services
(function(module){
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/posts.html', controller: 'BlogListCtrl'});
    $routeProvider.when('/posts/:pid', {templateUrl: 'partials/blogDetails.html', controller: 'BlogDetailsCtrl'});
    $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: 'BlogSearchCtrl'});
    $routeProvider.when('/searchResult/', {templateUrl: 'partials/searchResult.html', controller: 'BlogSearchResultCtrl'});
    $routeProvider.when('/partials', {templateUrl: 'partials/partials/taskList.html', controller: 'AdminTaskListCtrl'});
    $routeProvider.when('/partials/login', {templateUrl: 'partials/partials/login.html', controller: 'AdminLoginCtrl'});
    $routeProvider.when('/partials/posts', {templateUrl: 'partials/partials/posts.html', controller: 'AdminPostsCtrl'});
    $routeProvider.when('/partials/create', {templateUrl: 'partials/partials/create.html', controller: 'AdminPostCreateCtrl'});
    $routeProvider.when('/partials/posts/:pid', {templateUrl: 'partials/partials/edit.html', controller: 'AdminPostEditCtrl'});
    $routeProvider.when('/partials/comments', {templateUrl: 'partials/partials/comments.html', controller: 'AdminCommentsCtrl'});
    $routeProvider.when('/partials/tasks', {templateUrl: 'partials/partials/tasks.html', controller: 'AdminTasksCtrl'});
    $routeProvider.when('/partials/files', {templateUrl: 'partials/partials/files.html', controller: 'AdminFilesCtrl'});
    $routeProvider.when('/partials/pingBacks', {templateUrl: 'partials/partials/pingBacks.html', controller: 'AdminPingBacksCtrl'});
    $routeProvider.when('/partials/settings', {templateUrl: 'partials/partials/settings.html', controller: 'AdminSettingsCtrl'});

    $routeProvider.otherwise({redirectTo: '/'});
  }]);
  module.run(function($rootScope, $window) {
    $rootScope.r = $window.r;
  });
})(window.MainModule);