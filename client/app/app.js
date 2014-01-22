'use strict';


// Declare app level module which depends on filters, and services
(function(module){
    var checkAuthentication = function($q, $timeout, $http, $location, $rootScope){
        // Initialize a new promise
        var deferred = $q.defer();
        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedIn').success(function(user){
            // Authenticated
            if (user) $timeout(deferred.resolve, 0);
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
        $routeProvider.when('/', {templateUrl: 'app/partials/posts.html', controller: 'BlogListCtrl'});
        $routeProvider.when('/login', {templateUrl: 'app/partials/login.html', controller: 'SiteLoginCtrl'});
        $routeProvider.when('/posts/:pid', {templateUrl: 'app/partials/blogDetails.html', controller: 'BlogDetailsCtrl'});
        $routeProvider.when('/advancedSearch', {templateUrl: 'app/partials/advancedSearch.html', controller: 'BlogSearchCtrl'});
        $routeProvider.when('/searchResult', {templateUrl: 'app/partials/searchResult.html', controller: 'BlogSearchCtrl'});

        //admin routes
        $routeProvider.when('/admin/', {templateUrl: 'app/partials/admin/adminList.html', controller: 'AdminListCtrl', resolve: {isAuthenticated: checkAuthentication}});
        $routeProvider.when('/admin/posts', {templateUrl: 'app/partials/admin/posts.html', controller: 'AdminPostsCtrl', resolve: {isAuthenticated: checkAuthentication}});
        $routeProvider.when('/admin/posts/new', {templateUrl: 'app/partials/admin/create.html', controller: 'AdminPostEditCtrl', resolve: {isAuthenticated: checkAuthentication}});
        $routeProvider.when('/admin/posts/:pid', {templateUrl: 'app/partials/admin/edit.html', controller: 'AdminPostEditCtrl', resolve: {isAuthenticated: checkAuthentication}});
        $routeProvider.when('/admin/comments', {templateUrl: 'app/partials/admin/comments.html', controller: 'AdminCommentsCtrl', resolve: {isAuthenticated: checkAuthentication}});
        $routeProvider.when('/admin/tasks', {templateUrl: 'app/partials/admin/tasks.html', controller: 'AdminTasksCtrl', resolve: {isAuthenticated: checkAuthentication}});
        $routeProvider.when('/admin/files', {templateUrl: 'app/partials/admin/files.html', controller: 'AdminFilesCtrl', resolve: {isAuthenticated: checkAuthentication}});
        $routeProvider.when('/admin/pingBacks', {templateUrl: 'app/partials/admin/pingBacks.html', controller: 'AdminPingBacksCtrl', resolve: {isAuthenticated: checkAuthentication}});
        $routeProvider.when('/admin/settings', {templateUrl: 'app/partials/admin/settings.html', controller: 'AdminSettingsCtrl', resolve: {isAuthenticated: checkAuthentication}});

        //error routes
        $routeProvider.when('/404', {templateUrl: 'app/partials/error.html', controller: 'ErrorCtrl'});

        //default routes
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
    module.run(function($rootScope, $window) {
        $rootScope.r = $window.r;
    });
})(window.MainModule);