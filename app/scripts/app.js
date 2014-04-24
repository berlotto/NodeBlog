'use strict';


// Declare app level module which depends on filters, and services
(function(module){
   var checkAuthentication = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();
      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedIn').success(function(user){
         // Authenticated
         if (user) {
            $timeout(deferred.resolve, 0);
         }
         // Not Authenticated
         else {
            $rootScope.message = 'You need to log in.';
            $timeout(function(){deferred.reject();}, 0);
            $location.url('/login');
         }
      });
      return deferred.promise;
   };

   module.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {templateUrl: 'views/posts.html', controller: 'BlogListCtrl'});
      $routeProvider.when('/login', {templateUrl: 'views/login.html', controller: 'SiteLoginCtrl'});
      $routeProvider.when('/games', {templateUrl: 'views/games.html', controller: 'GamesCtrl', controllerAs: 'games'});
      $routeProvider.when('/posts/:pid', {templateUrl: 'views/blogDetails.html', controller: 'BlogDetailsCtrl'});
      $routeProvider.when('/advancedSearch/:key/:start/:end', {templateUrl: 'views/advancedSearch.html', controller: 'BlogSearchCtrl'});
      $routeProvider.when('/searchResult', {templateUrl: 'views/searchResult.html', controller: 'BlogSearchCtrl'});
      $routeProvider.when('/images', {templateUrl: 'views/images.html', controller: 'ImageListCtrl'});
      $routeProvider.when('/images/:size', {templateUrl: 'views/images.html', controller: 'ImageListCtrl'});
      $routeProvider.when('/image-details/:id', {templateUrl: 'views/image-details.html', controller: 'ImageDetailsCtrl'});

      //admin routes
      $routeProvider.when('/admin', {templateUrl: 'views/admin/adminList.html', controller: 'AdminListCtrl', resolve: {isAuthenticated: checkAuthentication}});
      $routeProvider.when('/admin/posts', {templateUrl: 'views/admin/posts.html', controller: 'AdminPostsCtrl', resolve: {isAuthenticated: checkAuthentication}});
      $routeProvider.when('/admin/posts/new', {templateUrl: 'views/admin/create.html', controller: 'AdminPostEditCtrl', resolve: {isAuthenticated: checkAuthentication}});
      $routeProvider.when('/admin/posts/:pid', {templateUrl: 'views/admin/edit.html', controller: 'AdminPostEditCtrl', resolve: {isAuthenticated: checkAuthentication}});
      $routeProvider.when('/admin/comments', {templateUrl: 'views/admin/comments.html', controller: 'AdminCommentsCtrl', resolve: {isAuthenticated: checkAuthentication}});
      $routeProvider.when('/admin/tasks', {templateUrl: 'views/admin/tasks.html', controller: 'AdminTasksCtrl', resolve: {isAuthenticated: checkAuthentication}});
      $routeProvider.when('/admin/files', {templateUrl: 'views/admin/files.html', controller: 'AdminFilesCtrl', resolve: {isAuthenticated: checkAuthentication}});
      $routeProvider.when('/admin/pingBacks', {templateUrl: 'views/admin/pingBacks.html', controller: 'AdminPingBacksCtrl', resolve: {isAuthenticated: checkAuthentication}});
      $routeProvider.when('/admin/settings', {templateUrl: 'views/admin/settings.html', controller: 'AdminSettingsCtrl', resolve: {isAuthenticated: checkAuthentication}});

      //error routes
      $routeProvider.when('/404', {templateUrl: 'views/error.html', controller: 'ErrorCtrl'});

      //default routes
      $routeProvider.otherwise({redirectTo: '/'});
   }]);

   module.config(['$locationProvider', function($locationProvider){
      $locationProvider.html5Mode(false);
   }]);
   module.config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('httpInterceptor');
   }]);

//   module.config(['localizeProvider', function(localizeProvider){
//      localizeProvider.setDefaultLocale('en');
//   }]);

})(window.MainModule);