'use strict';

define([], function () {
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/public/partials/posts.html',
                dependencies: [
                    '/public/js/controllers/blog-list.js',
                    '/public/js/services/blog-service.js'
                ]
            },
            '/login': {
                templateUrl: '/public/partials/login.html',
                dependencies: [
                    '/public/js/controllers/site-login.js',
                    '/public/js/services/auth-service.js'
                ]
            },
            '/admin': {
                templateUrl: '/admin/partials/tasks.html',
                dependencies: [
                    '/admin/controllers/admin-tasks.js',
                    '/admin/services/admin-blog-service.js',
                    '/admin/services/admin-task-service.js',
                    '/admin/services/file-service.js',
                    '/admin/services/settings-service.js'
                ]
            }
        }
    };
});