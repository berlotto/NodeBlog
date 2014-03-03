'use strict';

/* jasmine specs for services go here */

describe('SearchService', function() {
    var searchService,
        commentService,
        blogService;

    beforeEach(function(){
        module('chinook.services');

        module(function($provide, $q) {
            commentService = {//need to mock with $q

            };
            blogService = {//need to mock with $q

            };
            $provide.value('commentService', commentService);
            $provide.value('blogService', blogService);
        });

        inject(function($injector) {
            searchService = $injector.get('searchService');
        });
    });


    describe('storage on client side', function() {
        it('should save partial works in local storage or fallback persistent storage',
            inject(['searchService', function(searchService) {
                expect(searchService).toBeDefined();
                var results = searchService.findByKeyword('angular');
                expect(results.length).toBe(5);

            }]));
    });
});
