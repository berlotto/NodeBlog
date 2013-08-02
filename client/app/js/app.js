'use strict';


// Declare app level module which depends on filters, and services
(function(module){
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/blogs.html', controller: 'BlogListCtrl'});
    $routeProvider.when('/posts/:pid', {templateUrl: 'partials/blogDetails.html', controller: 'BlogDetailsCtrl'});
    $routeProvider.when('/admin', {templateUrl: 'partials/admin.html', controller: 'BlogAdminCtrl'});
    $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: 'BlogSearchCtrl'});
    $routeProvider.otherwise({redirectTo: '/admin'});
  }]);
})(window.MainModule);