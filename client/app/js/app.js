'use strict';


// Declare app level module which depends on filters, and services
(function(module){
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/blogs.html', controller: 'BlogListCtrl'});
    $routeProvider.when('/latest', {templateUrl: 'partials/blogDetails.html', controller: 'BlogDetailsCtrl'});
    $routeProvider.when('/admin', {templateUrl: 'partials/admin.html', controller: 'BlogAdminCtrl'});
    $routeProvider.otherwise({redirectTo: '/admin'});
  }]);
})(window.MainModule);