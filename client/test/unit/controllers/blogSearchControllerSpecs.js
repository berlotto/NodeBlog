'use strict';

/* jasmine specs for controllers go here */

describe('BlogSearchController', function(){

    var mockRouteParams, mockScope, mockBlogService;
    var blogSearchController;
    beforeEach(function(){
            mockRouteParams = {q:'angular'};
            mockScope = {};

            module(function($provide) {
                $provide.value('$routeParams', mockRouteParams);
            });
            module('chinook.controllers');

        }
    );


    it('should return BlogSearchCtrl with default setup', inject(['$rootScope', '$controller',
        function($rootScope, $controller) {
            var scope = $rootScope.$new();

            blogSearchController = $controller('BlogSearchCtrl', {$scope: scope, blogService: mockBlogService});
            expect(blogSearchController).toBeDefined();
        }]));

    it('should return three posts for searching "angular"', inject(['$rootScope', '$timeout', '$controller', '$q',
        function($rootScope, $timeout, $controller, $q) {
            var scope = $rootScope.$new();
            var deferred = $q.defer();
            mockBlogService = {
                search: function(key){
                    deferred.resolve(window.posts.slice(2));
                    return deferred.promise;
                }
            };

            blogSearchController = $controller('BlogSearchCtrl', {$scope: scope, blogService: mockBlogService});
            scope.search('angular');
            $timeout(function(){
                expect(scope.searchResults.length).toBe(3);
            });
        }]));

});
