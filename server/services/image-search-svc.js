/**
 * Created with JetBrains WebStorm.
 * User: jeff jin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(exports){
   var q = require('q'),
      fs = require('fs'),
      _ = require('lodash'),
      im = require('imagemagick'),
      resize = require('./image-resize-svc');

   var findByDate = function(date, folder){
      var deferred = q.defer();

      var files = fs.readdirSync(folder);
      var tempFiles = _.filter(files, function(file){
         console.log(folder + file);
         var stat = fs.statSync(folder + file);
         //console.log(stat.mtime.getTime());
         console.log(stat.mtime.getYear());
         console.log(stat.mtime.getMonth());
         console.log(stat.mtime.getDate());
         console.log(date.getYear());
         console.log(date.getMonth());
         return stat.mtime.getYear() == date.getYear() && (stat.mtime.getMonth() + 1) == date.getMonth()
            && stat.mtime.getDate() == date.getDate();
      });
      deferred.resolve(tempFiles);
      console.log('ImageFiles.length = ', tempFiles.length);
      return deferred.promise;

   };

   var findByDateRange = function(dateFrom, dateTo, folder){

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
   exports.findByDate = findByDate;
   exports.findByDateRange = findByDateRange;

})(module.exports);


