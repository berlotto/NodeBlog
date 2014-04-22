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
      storageSvc = require('./storage-svc'),
      _ = require('lodash/dist/lodash.underscore'),
      q = require('q');

   var _getFiles =  function(name, folders, maxSize){
      console.log('_getFiles', name, folders, maxSize);

      var imagePath = path.join(__dirname, '../../images/' + name);
      var basePath = path.join(__dirname, '../../');
      console.log('reading imagePath', imagePath, basePath);
      var tempFolders = _.map(folders, function(folder){
           return imagePath + '/' + folder;
      });
      var result = storageSvc.findImages(tempFolders);

      return result.then(function (files) {
            //console.log('files', files);
            //return files;
            var result = _.map(files, function (file) {
               var temp = file.replace(basePath, '/');
               var stat = fs.statSync(file);
               return {url: temp,
                  thumbnail:'/images/' + name + '/80/' + path.basename(file),
                  size: stat.size, uploadedOn: stat.atime};
            });
            console.log('result', result);
            return result.slice(0, maxSize);
         },
         function (err) {
            console.log('error finding images...', err);
         }
      );
   };



   exports.getImages = function(req, res){
      var folders = req.params.folders.split(',');
      _getFiles(req.params.name, folders, req.params.max).then(function(files){
         res.send(files);
      });
   };

})(module.exports);