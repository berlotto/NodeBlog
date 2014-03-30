/**
 * Created with JetBrains WebStorm.
 * User: jeff jin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(){
   var q = require('q'),
      fs = require('fs'),
      im = require('imagemagick'),
      resize = require('./resize');

   var resizeByDate = function(date, folder){

   };

   var resizeByDateRange = function(dateFrom, dateTo, folder){

   };

   var resizeAndUpload = function(dateFrom, dateTo, images){

   };

   var getInfo = function(path){
      var deferred = q.defer();
      console.log('getInfo...');

      im.identify(path, function(err, features){
         if (err) {
            //console.log('getInfo rejecting...');
            deferred.reject(err);
         }
         else{
            //console.log('getInfo resolving...', features);
            // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
            deferred.resolve(features);
         }
      });
      return deferred.promise;
   };

   exports.getInfo = getInfo;
})();


