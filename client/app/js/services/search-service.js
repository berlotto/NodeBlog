'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('searchService', ['$q', 'blogService', 'commentService',
      function($q, blogService, commentService){
         console.log('Initializing Search Service');
         var searchBlogs = function(k){
            blogService.search(k).then(function(result){

            });
         };
         var searchComments = function(k){
            commentService.search(k).then(function(result){

            });
         };


         return {
            search: function(keyword){
               //TODO
               $q.when([searchBlogs(keyword), searchComments(keyword)]).then(function(){

               });
            }
         }
      }]);
})(window.ServiceModule);