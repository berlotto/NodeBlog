'use strict';

/* jasmine specs for controllers go here */

describe('BlogSearchController', function(){

    var mockRouteParams, mockScope, $httpBackend;
    var blogSearchController;
    beforeEach(function(){
            mockRouteParams = {q:'angular'};
            mockScope = {};
            module('chinook.controllers');
            module(function($provide) {
                $provide.value('$routeParams', mockRouteParams);
            });
            inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
            });

        }
    );

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return three posts for searching "angular"', inject(['$rootScope', '$timeout', '$controller', '$q',
        function($rootScope, $timeout, $controller, $q) {
            var scope = $rootScope.$new();
            var deferred = $q.defer();
            var mockSearchService = {
                search: function(key){
                    deferred.resolve({posts: window.posts.slice(0, 3), comments:window.comments.slice(0, 2)} );
                    return deferred.promise;
                }
            };

            blogSearchController = $controller('BlogSearchCtrl', {$scope: scope, searchService: mockSearchService});
            expect(blogSearchController).toBeDefined();
            console.log('BlogSearchCtrl', blogSearchController);

            scope.search('angular').then(function(){
                console.log('BlogSearchCtrl.search', scope.searchResult);
                expect(scope.searchResult.posts.length).toBe(3);
                expect(scope.searchResult.comments.length).toBe(2);
            });
        }]));

});
