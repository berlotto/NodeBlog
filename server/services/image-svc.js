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

   var _getFiles =  function(name, folders, pageIndex, pageSize){
      console.log('_getFiles', name, folders, pageIndex, pageSize);

      var imagePath = path.join(__dirname, '../../images/' + name);
      var basePath = path.join(__dirname, '../../');
      console.log('reading imagePath', imagePath, basePath);
      var tempFolders = _.map(folders, function(folder){
           return imagePath + '/' + folder;
      });
      var result = storageSvc.findImages(tempFolders);

      return result.then(function (files) {
            //console.log('files', files);
            var result = _.map(files, function (file) {
               var temp = file.replace(basePath, '/');
               var stat = fs.statSync(file);
               return {url: temp,
                  thumbnail:'/images/' + name + '/80/' + path.basename(file),
                  size: stat.size, uploadedOn: stat.atime};
            });

            result = _.sortBy(result, function(f){
               return f.thumbnail;
            });

            result = result.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize );
            console.log('result', result);
            return result;
         },
         function (err) {
            console.log('error finding images...', err);
         }
      );
   };



   exports.getImages = function(req, res){
      var folders = req.params.folders.split(',');
      _getFiles(req.params.name, folders, req.params.index, req.params.size).then(function(files){
         res.send(files);
      });
   };

})(module.exports);