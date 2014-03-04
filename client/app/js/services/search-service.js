'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('searchService', ['$q', 'blogService', 'commentService',
      function($q, blogService, commentService){
         console.log('Initializing Search Service');
         var searchResult = {};
         var searchBlogs = function(k){
            return blogService.search(k).then(function(result){
                searchResult.posts = result.data;
            });
         };
         var searchComments = function(k){
            return commentService.search(k).then(function(result){
               searchResult.comments = result.data;
            });
         };


         return {
            searchTest: function(k){
               return blogService.search(k).then(function(result){
                  searchResult.posts = result.data;
               });
            },
            search: function(keyword){
               //TODO
               return $q.all([searchBlogs(keyword), searchComments(keyword)]).then(function(){
                  return searchResult;
               });
            }
         }
      }]);
})(window.ServiceModule);