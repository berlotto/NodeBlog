'use strict';

/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('imageService', ['$http', '$q', '$sce', 'moment', '$window',
      function($http, $q, $sce, moment, $window){
         console.log('Initializing Image Service');

         var getList = function(maxSize){
            if($window.devMode){
               var deferred = $q.defer();
               if(maxSize > $window.images.length){
                  maxSize =  $window.images.length;
               }
               deferred.resolve({data:$window.images.slice(0, maxSize)});
               return deferred.promise;
            }

            var queryString = '?max=' + maxSize;
            return $http.get('/api/images' + queryString);
         };

         var getDetails = function(id){
            if($window.devMode){
               var deferred = $q.defer();

               deferred.resolve(
                  {
                     data: _.find(id.images, function(img){
                         img.id = name;
                     })
                  });
               return deferred.promise;
            }

            return $http.get('/api/images/' + id);
         };

         var parse = function(images){
            _.forEach(images, function(img){
               parseOne(img);
            });
            return images;
         };

         var parseOne = function(img){
            img.createdOn = moment(img.dateTime).format("dddd, MMMM Do YYYY");
            return img;
         };

         var deleteImage = function(imgName){
            return $http.delete('/api/images/', {name: imgName});
         };

         var search = function(keywords){
            var deferred = $q.defer();
            if(!keywords){
               deferred.resolve({data:[]});
               return deferred.promise;
            }
            return $http.get('/api/images?q=' + keywords);
         };

         var uploadImage = function(){

         };

         return {
            getDetails: getDetails,
            getList: getList,
            upload: uploadImage,
            parse: parse,
            parseOne: parseOne,
            delete: deleteImage,
            search: search
         }
      }]);
})(window.ServiceModule);