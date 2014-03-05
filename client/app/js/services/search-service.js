'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('searchService', ['$q', 'blogService', 'commentService',
      function($q, blogService, commentService){
         console.log('Initializing Search Service');
         var searchResult = {};
         var searchPosts = function(k){
            return blogService.search(k).then(function(result){
                searchResult.posts = result.data;
            });
         };
         var searchComments = function(k){
            return commentService.search(k).then(function(result){
               searchResult.comments = result.data;
            });
         };

//
//          var search = function(keyword){
//              console.log('searchService.search for', keyword);
//
//              var deferred = $q.defer();
//              if(!keyword){
//                  deferred.resolve({data:[]});
//              }
//              else{
//                  deferred.resolve({data:[keyword, keyword, keyword]});
//              }
//              return deferred.promise;
//          };



          return {
            search: function(keyword){
               //TODO
               return $q.all([searchPosts(keyword), searchComments(keyword)]).then(function(){
                  return searchResult;
               });
            }
         }
      }]);
})(window.ServiceModule);