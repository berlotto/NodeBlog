'use strict';

/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function(module){
   module.factory('imageService', ['$http', '$q', 'moment', 'device',
      function($http, $q, moment, device){
         console.log('Initializing Image Service', device);

         var getFolderList = function(){
            return $http.get('/api/image-folders');
         };

         var getList = function(folderName, pageIndex, pageSize){
            return $http.get('/api/images/' + folderName + '/' + device.getAvailableImageWidth() + '/' + pageIndex + '/' + pageSize);
         };

         var getDetails = function(id){
            return $http.get('/api/images/' + id);
         };

         var parse = function(images){
            _.forEach(images, function(img){
               parseOne(img);
            });
            return images;
         };

         var parseOne = function(img){
            img.createdOn = moment(img.dateTime).format('dddd, MMMM Do YYYY');
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

         var mergeImages = function(source, target){
            //...
             return source;
         };

         return {
            getDetails: getDetails,
            getList: getList,
            upload: uploadImage,
            parse: parse,
            parseOne: parseOne,
            delete: deleteImage,
            search: search,
            mergeImages: mergeImages,
            getFolderList: getFolderList
         };
      }]);
})(window.ServiceModule);