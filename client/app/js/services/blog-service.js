'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
    module.factory('blogService', ['$http', '$q', '$sce', 'commentService', 'identity', 'moment', 'md5', 'marked', 'validatorService',
        function($http, $q, $sce, commentService, identity, moment, md5, marked, validator){
            console.log('Initializing Blog Service');

            var getList = function(dateRange, maxSize){
                var queryString = '';
                if(dateRange){
                    if(validator.isValidDateString(dateRange.from)){
                        queryString = queryString + 'from=' + dateRange.from;
                    }
                    if(validator.isValidDateString(dateRange.to)){
                        queryString = queryString + '&to=' + dateRange.to;
                    }
                }
                if(validator.isValidPositiveNumber(maxSize)){
                    if(queryString){
                        queryString = queryString + '&max=' + maxSize;
                    }
                    else{
                        queryString = 'max=' + maxSize;
                    }
                }
                if(queryString){
                    queryString = '?' + queryString;
                }
                return $http.get('/api/posts' + queryString);
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
                            if(!data){
                                return null;
                            }
                            data.markedBody = $sce.trustAsHtml(marked(data.body))
                            data.lastRevised = moment(data.updatedOn || data.createdOn).format('MMM Do YYYY');
                            commentService.parse(data.comments);

                            return data;
                        }
                    ])
                });
            };

            var search = function(keyword){
                var deferred = $q.defer();
                if(!keyword){
                    deferred.resolve({data:[]});
                    return deferred.promise;
                }
                return $http.get('/api/posts?q=' + keyword);
            };

            return {
                getList: getList,
                getDetails: getDetails,
                search: search
            }
        }]);
})(window.ServiceModule);