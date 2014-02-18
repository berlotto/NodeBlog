'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('commentService', ['$http', '$q', '$sce', 'moment', 'md5', 'identity', 'validatorService',
      function($http, $q, $sce, moment, md5, identity, validator){
         console.log('Initializing Comment Service');

         var getList = function(dateRange, maxSize){
            var queryString = '?';
            if(dateRange){
               if(validator.isValidDateString(dateRange.from)){
                  queryString = queryString + 'from=' + dateRange.from;
               }
               if(validator.isValidDateString(dateRange.to)){
                  queryString = queryString + '&to=' + dateRange.to;
               }
            }
            if(validator.isValidPositiveNumber(maxSize)){
               queryString = queryString + '&max=' + maxSize;
            }
            return $http.get('/api/comments' + queryString);
         };

         var parse = function(comments){
            _.forEach(comments, function(cmt){
               parseOne(cmt);
            });
            return comments;
         };

         var parseOne = function(cmt){
            cmt.markedBody = $sce.trustAsHtml(marked(cmt.body));
            cmt.dateString = moment(cmt.createdOn).format("dddd, MMMM Do YYYY, h:mm:ss a");
            if(cmt.authorEmail){
               cmt.authorEmailHash = md5(cmt.authorEmail);
            }
            return cmt;
         };

         //create or update
         var saveComment = function(comment, postId){
            //update
            if(comment._id){
               return $http.put('/api/comments/', {postId: postId, comment: comment}, {
                  transformRequest: [
                     function(data, headersGetter) {
                        //var header = headersGetter();
                        data.updatedOn = new Date();
                        data.updatedBy = identity.currentUser.name;
                        return data;
                     }
                  ]
               });
            }
            //create
            return $http.post('/api/comments/', {postId: postId, comment: comment}, {
               transformRequest: [
                  function(data, headersGetter) {
                     //var header = headersGetter();
                     data.createdOn = new Date();
                     data.createdBy = identity.currentUser.name;
                     data.updatedOn = null;
                     data.updatedBy = null;
                     return data;
                  }
               ].concat($http.defaults.transformRequest)
            });
         };

         var deleteComment = function(commentId){
            return $http.delete('/api/comments/', {commentId: commentId});
         };

         return {
            getList: getList,
            save: saveComment,
            parse: parse,
            parseOne: parseOne,
            delete: deleteComment
         }
      }]);
})(window.ServiceModule);