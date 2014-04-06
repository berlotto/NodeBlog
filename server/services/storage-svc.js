/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(){

   var fs = require('fs'),
      path = require('path'),
      _ = require('lodash/dist/lodash.underscore'),
      Q = require('q');

   var createFolder = function(folder){
      var deferred = Q.defer();
      fs.mkdir(folder, function(err){
         if(err){
            deferred.reject(err);
         }
         else{
            deferred.resolve(folder);
         }
      });
      return deferred.promise;
   };

   exports.createFolder = createFolder;

   exports.createFolders = function(folders){
      var promises = [ ];
      _.each(folders, function(folder) {
         promises.push(createFolder(folder));
      });
      return Q.all(promises);
   };

})(module.exports);