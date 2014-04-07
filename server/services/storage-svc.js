/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(){

   if (typeof String.prototype.endsWith !== 'function') {
      String.prototype.endsWith = function(suffix) {
         return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };
   }

   var fs = require('fs'),
      path = require('path'),
      util = require('util'),
      _ = require('lodash/dist/lodash.underscore'),
      Q = require('q');


   var createFolder = function(folder, basePath){
      var deferred = Q.defer();
      if(basePath) {
         folder = path.join(basePath, folder);
         fs.exists(folder, function (exists) {
            util.debug(exists ? (folder + ' (dstPath) exists.') : (folder + ' (dstPath) is new and being created.'));
            if (exists) {
               deferred.resolve(folder);
            }
            else {
               fs.mkdir(folder, function (err) {
                  if (err) {
                     deferred.reject(err);
                  }
                  else {
                     deferred.resolve(folder);
                  }
               });
            }
         });
      }

      return deferred.promise;
   };

   exports.createFolder = createFolder;

   exports.createFolders = function(folders, basePath){
      var promises = [ ];
      _.each(folders, function(folder) {
         promises.push(createFolder(folder, basePath));
      });
      console.log(promises.length + ' promises are being created');
      return Q.all(promises);
   };

   var getExtension = function(filename) {
      var ext = path.extname(filename||'').split('.');
      return ext[ext.length - 1];
   };

   var findImagesInFolder = function(folder){
      var deferred = Q.defer();
      fs.readdir(folder, function(err, files){
         var temp = _.filter(files, function(file){
            return getExtension(file).toLowerCase() === 'jpg';
         });
         var results = [];
         _.each(temp, function(f){
            results.push(path.join(folder, f));
         });
          if(err){
             deferred.reject(err);
          }
         else{
             deferred.resolve(results);
          }
      });
      return deferred.promise;
   };

   exports.findImages = function(folders){
      var filePaths = [ ];
      _.each(folders, function(folder) {
         filePaths.push(findImagesInFolder(folder));
      });
      console.log(filePaths.length + ' promises are being created');
      return Q.all(filePaths).then(function(pathArray){
         //console.log('pathArray', pathArray);
         var temp = [];
         _.each(pathArray, function(paths){
            temp = temp.concat(paths);
         });
         //console.log('temp', temp);
         return temp;
      });
   };

   exports.getImageNamesInFolder = function(folder){
      var deferred = Q.defer();
      fs.readdir(folder, function(err, files){
         var temp = _.filter(files, function(file){
            return getExtension(file).toLowerCase() === 'jpg';
         });
         console.log(folder, files);
         if(err){
            deferred.reject(err);
         }
         else{
            deferred.resolve(temp);
         }
      });
      return deferred.promise;
   };

})(module.exports);