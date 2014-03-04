'use strict';

/* jasmine specs for services go here */

describe('SearchService', function() {
   var searchService,
      commentService,
      blogService,
      $provide;

   beforeEach(function(){
      module('chinook.services');

      module(['$provide', function(provide) {
          $provide = provide;
      }]);

      inject(['$q', function($q) {
         var deferred1 = $q.defer();
         commentService = {
            search: function(key){
               deferred1.resolve(window.comments.slice(0, 2));
               return deferred1.promise;
            }
         };

         var deferred2 = $q.defer();
         blogService = {
            search: function(key){
               deferred2.resolve(window.posts.slice(1, 2));
               return deferred2.promise;
            }
         };
         $provide.value('commentService', commentService);
         $provide.value('blogService', blogService);
      }]);

   });


   describe('Search Service should combine the results from blog and comment service', function() {
      it('should call blogService.search and commentService.search',
         inject(['searchService', function(searchService) {
            expect(searchService).toBeDefined();
            searchService.search('angular').then(function(result){
               expect(result.posts.length).toBe(3);
               expect(result.comments.length).toBe(3);
            })
         }]));
   });
});
