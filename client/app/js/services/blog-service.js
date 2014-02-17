'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
  module.factory('blogService', ['$http', '$q', '$sce', 'commentService', 'identity', 'moment', 'md5', 'marked',
      function($http, $q, $sce, commentService, identity, moment, md5, marked){
    var getList = function(dateRange, size){
        return $http.get('/api/posts');
    };

    var getDetails = function(id){
        var deferred = $q.defer();
        if(id === 'new' || !id){
            var newPost =  {topic: 'topic for the new post', urlLink: '', metaTitle: '', summary: 'please write a summary', disableComment: false, status: 'draft', body: 'new post content here'};
            deferred.resolve({data: newPost});
            return deferred.promise;
        }
        return $http.get('/api/posts/' + id, {
            transformResponse: $http.defaults.transformResponse.concat([
                function(data, headersGetter){
                    //console.log('transform response', data);
                    data.markedBody = $sce.trustAsHtml(marked(data.body))
                    data.lastRevised = moment(data.updatedOn || data.createdOn).format('MMM Do YYYY');
                    commentService.parse(data.comments);

                    return data;
                }
            ])
        });
    };

    return {
      getPosts: getList,
      getPostDetails: getDetails
    }
  }]);
})(window.ServiceModule);