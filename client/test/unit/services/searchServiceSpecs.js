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


    describe('Search Service should combine the results from blog and comment service', function() {
        it('should call blogService.search and commentService.search',
            inject(['searchService', function(searchService) {
                expect(searchService).toBeDefined();
                var results = searchService.findByKeyword('angular');
                expect(results.length).toBe(5);

            }]));
    });
});
