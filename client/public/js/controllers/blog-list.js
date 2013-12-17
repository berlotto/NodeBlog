'use strict';

/* Controllers */

define(['appModule'], function (module) {
    console.log('Registering Blog List Controller');

    module.lazy.controller('BlogListCtrl', ['$scope', '$routeParams', '$rootScope', 'blogService',
        function ($scope, $routeParams, $rootScope, blogService) {
            console.log('Initializing Blog List Controller');
            blogService.getPosts({from: $routeParams.from, to: $routeParams.to}, 20)
                .success(function (data, status, headers, config) {
                    $scope.posts = data;
                }).
                error(function (data, status, headers, config) {
                    alert(status + ',' + data);
                });
        }]
    );
});