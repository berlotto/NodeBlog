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

    //error routes
    $routeProvider.when('/404', {templateUrl: 'app/partials/error.html', controller: 'ErrorCtrl'});

    //default routes
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

    var loadFile = function(filename, filetype){
        loadFile.fileList = {};//list of files already added
        var fileref;
        if (!loadFile.fileList[filename]){
            if (filetype=="js"){ //if filename is a external JavaScript file
                fileref = document.createElement('script');
                fileref.setAttribute("type","text/javascript");
                fileref.setAttribute("src", filename);
            }
            else if (filetype=="css"){ //if filename is an external CSS file
                fileref=document.createElement("link")
                fileref.setAttribute("rel", "stylesheet")
                fileref.setAttribute("type", "text/css")
                fileref.setAttribute("href", filename)
            }
            if (typeof fileref!="undefined")
            {
                document.getElementsByTagName("head")[0].appendChild(fileref);
                loadFile.fileList[filename] = filetype;
            }
        }
        else{
            console.log("file already added!");
        }
    };

    module.run(function($rootScope, $window) {
        $rootScope.r = $window.r;
        $rootScope.loadFile = loadFile;
    });
})(window.MainModule);