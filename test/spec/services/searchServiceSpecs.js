'use strict';

/* jasmine specs for services go here */

describe('Search Service', function() {
    var commentService,
        blogService,
        $provide,
        $httpBackend;

    beforeEach(function(){
        module('chinook.services');

        module(['$provide', function(provide) {
            $provide = provide;
        }]);

        inject(['$q', '$injector', function($q, $injector) {
            $httpBackend = $injector.get('$httpBackend');

            commentService = {
                search: function(key){
                    var deferred1 = $q.defer();
                    deferred1.resolve({data:window.comments.slice(0, 2)});
                    return deferred1.promise;
                }
            };

            blogService = {
                search: function(key){
                    var deferred2 = $q.defer();
                    console.log('mock blogService.search', key);
                    deferred2.resolve({data: window.posts.slice(0, 2)});
                    return deferred2.promise;
                }
            };
            $provide.value('commentService', commentService);
            $provide.value('blogService', blogService);
        }]);

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Search Service', function() {
        it('should combine the results from blog and comment service', inject(['searchService', function(searchService) {
                expect(searchService).toBeDefined();
                searchService.search('ember').then(function(result){
                    console.log('searchService search result', result);

                    expect(result.posts.length).toBe(2);
                    expect(result.comments.length).toBe(2);
                })
            }]));
    });
});
